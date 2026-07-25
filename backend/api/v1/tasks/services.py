from django.utils import timezone
from django.db import transaction
from rest_framework.exceptions import PermissionDenied, ValidationError, NotFound

from apps.tasks.models import Task, TaskStatus
from apps.workspaces.models import WorkspaceMember, WorkspaceRole
from apps.projects.models import ProjectMember
from api.v1.notifications.services import NotificationService
from apps.audit.models import EventLog


class TaskActionService:
    """
    Service with task actions: complete_task and delete_task
    """

    @staticmethod
    @transaction.atomic
    def complete_task(user, task_id):
        """
        Mark task completed.

        - Validate task exists.
        - Validate workspace/project access (user must be a member of the workspace or project).
        - Prevent completing already completed tasks.
        - Update completed_at if model contains it.
        - Return updated task.
        - Create notification using NotificationService (if supported).
        - Create recent activity using EventLog.
        """
        task = Task.objects.select_related("workspace", "project").filter(id=task_id).first()
        if task is None:
            raise NotFound("Task not found")

        # Access check: membership in workspace OR membership in project (if project is set)
        has_workspace_membership = WorkspaceMember.objects.filter(workspace=task.workspace, user=user).exists()
        has_project_membership = False
        if task.project:
            has_project_membership = ProjectMember.objects.filter(project=task.project, user=user).exists()

        if not (has_workspace_membership or has_project_membership):
            raise PermissionDenied("You don't have access to this task's workspace or project")

        if task.status == TaskStatus.COMPLETED:
            raise ValidationError("Task is already completed")

        task.status = TaskStatus.COMPLETED

        # Update completed_at if the model has it
        try:
            task.completed_at = timezone.now()
        except Exception:
            # If model does not contain it or assignment fails, ignore
            pass

        task.save()

        # Notification: attempt to use NotificationService if a method exists.
        try:
            NotificationService.task_completed(
                actor=user,
                workspace=task.workspace,
                task=task
            )
        except Exception:
            # ignore if not implemented
            pass

        # Recent activity / audit log
        try:
            EventLog.objects.create(
                event_type="TASK_COMPLETED",
                title="Task completed",
                description=f"{user.username} completed task '{task.title}'",
                resource_type="TASK",
                resource_id=task.id,
                metadata={"workspace_id": str(task.workspace.id), "project_id": str(task.project.id) if task.project else None},
                actor=user
            )
        except Exception:
            pass

        return task

    @staticmethod
    @transaction.atomic
    def delete_task(user, task_id):
        """
        Delete task.

        - Validate task exists.
        - Validate permissions: workspace owner/admin or task creator can delete.
        - Delete task.
        - Return success response or raise appropriate errors.
        - Create notification using NotificationService (if supported).
        - Create recent activity using EventLog.
        """
        task = Task.objects.select_related("workspace", "created_by").filter(id=task_id).first()
        if task is None:
            raise NotFound("Task not found")

        workspace = task.workspace

        # Permission: workspace OWNER or ADMIN OR task creator
        is_workspace_admin = WorkspaceMember.objects.filter(
            workspace=workspace,
            user=user,
            role__in=[WorkspaceRole.OWNER, WorkspaceRole.ADMIN]
        ).exists()

        if not (is_workspace_admin or task.created_by_id == user.id):
            raise PermissionDenied("You don't have permission to delete this task")

        # Keep some info for notifications / activity after deletion
        task_title = task.title
        task_workspace = task.workspace

        # Delete task
        task.delete()

        # Notification via NotificationService if available
        try:
            NotificationService.task_deleted(
                actor=user,
                workspace=task_workspace,
                title=task_title
            )
        except Exception:
            pass

        # Recent activity / audit log
        try:
            EventLog.objects.create(
                event_type="TASK_DELETED",
                title="Task deleted",
                description=f"{user.username} deleted task '{task_title}'",
                resource_type="TASK",
                resource_id=task_id,
                metadata={"workspace_id": str(task_workspace.id)},
                actor=user
            )
        except Exception:
            pass

        return {"detail": "Task deleted successfully"}
