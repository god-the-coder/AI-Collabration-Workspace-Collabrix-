from django.utils import timezone
from django.db import transaction
from rest_framework.exceptions import PermissionDenied, ValidationError, NotFound

from apps.tasks.models import Task, TaskStatus, TaskPriorities
from apps.accounts.models import UserModel
from apps.workspaces.models import WorkspaceMember, WorkspaceRole, Workspace
from apps.projects.models import ProjectMember, Project, Milestone
from api.v1.notifications.services import NotificationService
from apps.audit.models import EventLog

from datetime import timedelta


# class TaskActionService:
#     """
#     Service with task actions: complete_task and delete_task
#     """

#     @staticmethod
#     @transaction.atomic
#     def complete_task(user, task_id):
#         """
#         Mark task completed.

#         - Validate task exists.
#         - Validate workspace/project access (user must be a member of the workspace or project).
#         - Prevent completing already completed tasks.
#         - Update completed_at if model contains it.
#         - Return updated task.
#         - Create notification using NotificationService (if supported).
#         - Create recent activity using EventLog.
#         """
#         task = Task.objects.select_related("workspace", "project").filter(id=task_id).first()
#         if task is None:
#             raise NotFound("Task not found")

#         # Access check: membership in workspace OR membership in project (if project is set)
#         has_workspace_membership = WorkspaceMember.objects.filter(workspace=task.workspace, user=user).exists()
#         has_project_membership = False
#         if task.project:
#             has_project_membership = ProjectMember.objects.filter(project=task.project, user=user).exists()

#         if not (has_workspace_membership or has_project_membership):
#             raise PermissionDenied("You don't have access to this task's workspace or project")

#         if task.status == TaskStatus.COMPLETED:
#             raise ValidationError("Task is already completed")

#         task.status = TaskStatus.COMPLETED

#         # Update completed_at if the model has it
#         try:
#             task.completed_at = timezone.now()
#         except Exception:
#             # If model does not contain it or assignment fails, ignore
#             pass

#         task.save()

#         # Notification: attempt to use NotificationService if a method exists.
#         try:
#             NotificationService.task_completed(
#                 actor=user,
#                 workspace=task.workspace,
#                 task=task
#             )
#         except Exception:
#             # ignore if not implemented
#             pass

#         # Recent activity / audit log
#         try:
#             EventLog.objects.create(
#                 event_type="TASK_COMPLETED",
#                 title="Task completed",
#                 description=f"{user.username} completed task '{task.title}'",
#                 resource_type="TASK",
#                 resource_id=task.id,
#                 metadata={"workspace_id": str(task.workspace.id), "project_id": str(task.project.id) if task.project else None},
#                 actor=user
#             )
#         except Exception:
#             pass

#         return task

#     @staticmethod
#     @transaction.atomic
#     def delete_task(user, task_id):
#         """
#         Delete task.

#         - Validate task exists.
#         - Validate permissions: workspace owner/admin or task creator can delete.
#         - Delete task.
#         - Return success response or raise appropriate errors.
#         - Create notification using NotificationService (if supported).
#         - Create recent activity using EventLog.
#         """
#         task = Task.objects.select_related("workspace", "created_by").filter(id=task_id).first()
#         if task is None:
#             raise NotFound("Task not found")

#         workspace = task.workspace

#         # Permission: workspace OWNER or ADMIN OR task creator
#         is_workspace_admin = WorkspaceMember.objects.filter(
#             workspace=workspace,
#             user=user,
#             role__in=[WorkspaceRole.OWNER, WorkspaceRole.ADMIN]
#         ).exists()

#         if not (is_workspace_admin or task.created_by_id == user.id):
#             raise PermissionDenied("You don't have permission to delete this task")

#         # Keep some info for notifications / activity after deletion
#         task_title = task.title
#         task_workspace = task.workspace

#         # Delete task
#         task.delete()

#         # Notification via NotificationService if available
#         try:
#             NotificationService.task_deleted(
#                 actor=user,
#                 workspace=task_workspace,
#                 title=task_title
#             )
#         except Exception:
#             pass

#         # Recent activity / audit log
#         try:
#             EventLog.objects.create(
#                 event_type="TASK_DELETED",
#                 title="Task deleted",
#                 description=f"{user.username} deleted task '{task_title}'",
#                 resource_type="TASK",
#                 resource_id=task_id,
#                 metadata={"workspace_id": str(task_workspace.id)},
#                 actor=user
#             )
#         except Exception:
#             pass

#         return {"detail": "Task deleted successfully"}


# class TaskService:

#     @staticmethod
#     @transaction.atomic
#     def create_task(user, workspace_id, validated_data):

#         workspace = Workspace.objects.filter(
#             id=workspace_id
#         ).first()

#         if workspace is None:
#             raise NotFound("Workspace not found.")

#         workspace_member = WorkspaceMember.objects.filter(
#             workspace=workspace,
#             user=user
#         ).first()

#         if workspace_member is None:
#             raise PermissionDenied(
#                 "You don't have access to this workspace."
#             )

#         project = None
#         project_id = validated_data.get("project_id")

#         if project_id:
#             project = Project.objects.filter(
#                 id=project_id,
#                 workspace=workspace
#             ).first()

#             if project is None:
#                 raise ValidationError(
#                     {
#                         "project_id": "Project does not belong to this workspace."
#                     }
#                 )

#             is_project_member = ProjectMember.objects.filter(
#                 project=project,
#                 user=user
#             ).exists()

#             if not is_project_member:
#                 raise PermissionDenied(
#                     "You don't have access to this project."
#                 )

#         assignee = None
#         assignee_id = validated_data.get("assignee_id")

#         if assignee_id:
#             assignee = UserModel.objects.filter(
#                 id=assignee_id
#             ).first()

#             if assignee is None:
#                 raise ValidationError(
#                     {
#                         "assignee_id": "Assignee not found."
#                     }
#                 )

#             is_workspace_member = WorkspaceMember.objects.filter(
#                 workspace=workspace,
#                 user=assignee
#             ).exists()

#             if not is_workspace_member:
#                 raise ValidationError(
#                     {
#                         "assignee_id": "Assignee is not a member of this workspace."
#                     }
#                 )

#             if project:
#                 is_project_member = ProjectMember.objects.filter(
#                     project=project,
#                     user=assignee
#                 ).exists()

#                 if not is_project_member:
#                     raise ValidationError(
#                         {
#                             "assignee_id": "Assignee is not a member of this project."
#                         }
#                     )

#         parent_task = None
#         parent_task_id = validated_data.get("parent_task_id")

#         if parent_task_id:
#             parent_task = Task.objects.filter(
#                 id=parent_task_id,
#                 workspace=workspace
#             ).first()

#             if parent_task is None:
#                 raise ValidationError(
#                     {
#                         "parent_task_id": "Parent task not found in this workspace."
#                     }
#                 )

#             if parent_task.project_id != (
#                 project.id if project else None
#             ):
#                 raise ValidationError(
#                     {
#                         "parent_task_id": (
#                             "Parent task must belong to the same project."
#                         )
#                     }
#                 )

#         milestone = None
#         milestone_id = validated_data.get("milestone_id")

#         if milestone_id:
#             milestone = Milestone.objects.filter(
#                 id=milestone_id,
#                 project=project
#             ).first()

#             if milestone is None:
#                 raise ValidationError(
#                     {
#                         "milestone_id": (
#                             "Milestone not found for this project."
#                         )
#                     }
#                 )

#         task = Task.objects.create(
#             workspace=workspace,
#             project=project,
#             created_by=user,
#             assignee=assignee,
#             parent_task=parent_task,
#             milestone=milestone,
#             title=validated_data["title"],
#             description=validated_data.get("description"),
#             priority=validated_data.get(
#                 "priority",
#                 TaskPriorities.MEDIUM
#             ),
#             status=validated_data.get(
#                 "status",
#                 TaskStatus.TODO
#             ),
#             due_date=validated_data.get("due_date")
#         )

#         return task


class GlobalTaskService:


    @staticmethod
    def get_global_tasks(user):

        today = timezone.localdate()

        # Monday = 0, Sunday = 6
        week_start = today - timedelta(days=today.weekday())
        week_end = week_start + timedelta(days=7)

        # ---------------------------------------------------------
        # Base queryset
        # ---------------------------------------------------------

        base_queryset = (
            Task.objects
            .filter(
                assignee=user,
                workspace__members__user=user,
            )
            .select_related(
                "workspace",
                "project",
                "assignee",
                "created_by",
            )
            .distinct()
        )

        # ---------------------------------------------------------
        # Overview statistics
        # ---------------------------------------------------------

        assigned_to_me = base_queryset.count()

        due_today_count = base_queryset.filter(
            due_date=today
        ).exclude(
            status__in=[
                TaskStatus.COMPLETED,
                TaskStatus.CANCELLED,
            ]
        ).count()

        overdue_count = base_queryset.filter(
            due_date__lt=today
        ).exclude(
            status__in=[
                TaskStatus.COMPLETED,
                TaskStatus.CANCELLED,
            ]
        ).count()

        completed_this_week = base_queryset.filter(
            status=TaskStatus.COMPLETED,
            completed_at__date__gte=week_start,
            completed_at__date__lt=week_end,
        ).count()

        # ---------------------------------------------------------
        # Due Today
        # ---------------------------------------------------------

        due_today_tasks = (
            base_queryset
            .filter(due_date=today)
            .exclude(
                status__in=[
                    TaskStatus.COMPLETED,
                    TaskStatus.CANCELLED,
                ]
            )
            .order_by("due_date", "-updated_at")
        )

        # ---------------------------------------------------------
        # Overdue
        # ---------------------------------------------------------

        overdue_tasks = (
            base_queryset
            .filter(due_date__lt=today)
            .exclude(
                status__in=[
                    TaskStatus.COMPLETED,
                    TaskStatus.CANCELLED,
                ]
            )
            .order_by("due_date", "-updated_at")
        )

        # ---------------------------------------------------------
        # Upcoming
        # ---------------------------------------------------------

        upcoming_tasks = (
            base_queryset
            .filter(due_date__gt=today)
            .exclude(
                status__in=[
                    TaskStatus.COMPLETED,
                    TaskStatus.CANCELLED,
                ]
            )
            .order_by("due_date", "-updated_at")
        )

        return {
            "overview": {
                "assigned_to_me": assigned_to_me,
                "due_today": due_today_count,
                "overdue": overdue_count,
                "completed_this_week": completed_this_week,
            },

            "due_today": {
                "count": due_today_tasks.count(),
                "tasks": due_today_tasks,
            },

            "overdue": {
                "count": overdue_tasks.count(),
                "tasks": overdue_tasks,
            },

            "upcoming": {
                "count": upcoming_tasks.count(),
                "tasks": upcoming_tasks,
            },
        }



class TaskService:

    @staticmethod
    @transaction.atomic
    def create_task(user, workspace, validated_data):
        project_id = validated_data.get("project_id")
        assignee_id = validated_data.get("assignee_id")
        milestone_id = validated_data.get("milestone_id")
        parent_task_id = validated_data.get("parent_task_id")

        # ---------------------------------------------------------
        # Workspace access
        # ---------------------------------------------------------

        is_workspace_member = WorkspaceMember.objects.filter(
            workspace=workspace,
            user=user,
        ).exists()

        if not is_workspace_member:
            raise PermissionDenied(
                "You don't have access to this workspace"
            )

        # ---------------------------------------------------------
        # Project validation
        # ---------------------------------------------------------

        project = None

        if project_id:
            from apps.projects.models import Project

            project = Project.objects.filter(
                id=project_id,
                workspace=workspace,
            ).first()

            if project is None:
                raise ValidationError(
                    {"project_id": "Project does not belong to this workspace"}
                )

        # ---------------------------------------------------------
        # Assignee validation
        # ---------------------------------------------------------

        assignee = None

        if assignee_id:
            from apps.accounts.models import UserModel

            assignee = UserModel.objects.filter(
                id=assignee_id,
                is_active=True,
            ).first()

            if assignee is None:
                raise ValidationError(
                    {"assignee_id": "Invalid assignee"}
                )

            is_assignee_workspace_member = WorkspaceMember.objects.filter(
                workspace=workspace,
                user=assignee,
            ).exists()

            if not is_assignee_workspace_member:
                raise ValidationError(
                    {
                        "assignee_id":
                        "Assignee must be a member of this workspace"
                    }
                )

            if project:
                is_assignee_project_member = ProjectMember.objects.filter(
                    project=project,
                    user=assignee,
                ).exists()

                if not is_assignee_project_member:
                    raise ValidationError(
                        {
                            "assignee_id":
                            "Assignee must be a member of this project"
                        }
                    )

        # ---------------------------------------------------------
        # Milestone validation
        # ---------------------------------------------------------

        milestone = None

        if milestone_id:
            from apps.projects.models import Milestone

            milestone = Milestone.objects.filter(
                id=milestone_id,
                project=project,
            ).first()

            if milestone is None:
                raise ValidationError(
                    {
                        "milestone_id":
                        "Milestone does not belong to this project"
                    }
                )

        # ---------------------------------------------------------
        # Parent task validation
        # ---------------------------------------------------------

        parent_task = None

        if parent_task_id:
            parent_task = Task.objects.filter(
                id=parent_task_id,
                workspace=workspace,
            ).first()

            if parent_task is None:
                raise ValidationError(
                    {
                        "parent_task_id":
                        "Parent task does not belong to this workspace"
                    }
                )

            parent_project_id = (
                project.id if project else None
            )

            if parent_task.project_id != parent_project_id:
                raise ValidationError(
                    {
                        "parent_task_id":
                        "Parent task must belong to the same project"
                    }
                )

        # ---------------------------------------------------------
        # Task status
        # ---------------------------------------------------------
        #
        # New tasks always start as TODO.
        # Completion must happen through complete_task().
        # ---------------------------------------------------------

        task = Task.objects.create(
            workspace=workspace,
            project=project,
            created_by=user,
            assignee=assignee,
            milestone=milestone,
            parent_task=parent_task,
            title=validated_data["title"],
            description=validated_data.get("description"),
            priority=validated_data.get("priority"),
            status=TaskStatus.TODO,
            due_date=validated_data.get("due_date"),
        )

        return task


class TaskDetailService:

    @staticmethod
    def get_task_detail(user, task_id):
        task = (
            Task.objects
            .select_related(
                "workspace",
                "project",
                "assignee",
                "milestone",
                "parent_task",
                "created_by",
            )
            .prefetch_related(
                "subtasks",
            )
            .filter(id=task_id)
            .first()
        )

        if task is None:
            raise NotFound("Task not found")

        # ---------------------------------------------------------
        # Workspace access
        # ---------------------------------------------------------

        has_workspace_membership = WorkspaceMember.objects.filter(
            workspace=task.workspace,
            user=user,
        ).exists()

        # ---------------------------------------------------------
        # Project access
        # ---------------------------------------------------------

        has_project_membership = False

        if task.project:
            has_project_membership = ProjectMember.objects.filter(
                project=task.project,
                user=user,
            ).exists()

        if not (
            has_workspace_membership
            or has_project_membership
        ):
            raise PermissionDenied(
                "You don't have access to this task's workspace or project"
            )

        return task


class TaskActionService:

    @staticmethod
    @transaction.atomic
    def complete_task(user, task_id):

        # Lock the row so two simultaneous completion requests
        # cannot both pass the status check.
        task = (
            Task.objects
            .select_for_update()
            .select_related(
                "workspace",
                "project",
            )
            .filter(id=task_id)
            .first()
        )

        if task is None:
            raise NotFound("Task not found")

        # ---------------------------------------------------------
        # Access check
        # ---------------------------------------------------------

        has_workspace_membership = WorkspaceMember.objects.filter(
            workspace=task.workspace,
            user=user,
        ).exists()

        has_project_membership = False

        if task.project:
            has_project_membership = ProjectMember.objects.filter(
                project=task.project,
                user=user,
            ).exists()

        if not (
            has_workspace_membership
            or has_project_membership
        ):
            raise PermissionDenied(
                "You don't have access to this task's workspace or project"
            )

        # ---------------------------------------------------------
        # Already completed
        # ---------------------------------------------------------

        if task.status == TaskStatus.COMPLETED:
            raise ValidationError(
                "Task is already completed"
            )

        # ---------------------------------------------------------
        # Complete task
        # ---------------------------------------------------------

        task.status = TaskStatus.COMPLETED
        task.completed_at = timezone.now()

        task.save(
            update_fields=[
                "status",
                "completed_at",
                "updated_at",
            ]
        )

        # ---------------------------------------------------------
        # Notification
        # ---------------------------------------------------------

        try:
            NotificationService.task_completed(
                actor=user,
                workspace=task.workspace,
                task=task,
            )
        except Exception:
            pass

        # ---------------------------------------------------------
        # Activity / Audit log
        # ---------------------------------------------------------

        try:
            EventLog.objects.create(
                event_type="TASK_COMPLETED",
                title="Task completed",
                description=(
                    f"{user.username} completed task "
                    f"'{task.title}'"
                ),
                resource_type="TASK",
                resource_id=task.id,
                metadata={
                    "workspace_id": str(task.workspace.id),
                    "project_id": (
                        str(task.project.id)
                        if task.project
                        else None
                    ),
                },
                actor=user,
            )
        except Exception:
            pass

        return task

    @staticmethod
    @transaction.atomic
    def delete_task(user, task_id):

        task = (
            Task.objects
            .select_for_update()
            .select_related(
                "workspace",
                "created_by",
            )
            .filter(id=task_id)
            .first()
        )

        if task is None:
            raise NotFound("Task not found")

        workspace = task.workspace

        is_workspace_admin = WorkspaceMember.objects.filter(
            workspace=workspace,
            user=user,
            role__in=[
                WorkspaceRole.OWNER,
                WorkspaceRole.ADMIN,
            ],
        ).exists()


        if not (
            is_workspace_admin
            or task.created_by_id == user.id
        ):
            raise PermissionDenied(
                "You don't have permission to delete this task"
            )

        # Store required information before deletion.
        task_title = task.title
        task_workspace = task.workspace
        task_id = task.id


        task.delete()

        try:
            NotificationService.task_deleted(
                actor=user,
                workspace=task_workspace,
                title=task_title,
            )
        except Exception:
            pass

        try:
            EventLog.objects.create(
                event_type="TASK_DELETED",
                title="Task deleted",
                description=(
                    f"{user.username} deleted task "
                    f"'{task_title}'"
                ),
                resource_type="TASK",
                resource_id=task_id,
                metadata={
                    "workspace_id": str(task_workspace.id),
                },
                actor=user,
            )
        except Exception:
            pass

        return {
            "detail": "Task deleted successfully"
        }