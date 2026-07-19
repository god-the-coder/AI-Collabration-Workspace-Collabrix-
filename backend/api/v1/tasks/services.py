from apps.tasks.models import Task , TaskStatus, TaskPriorities
from django.utils import timezone
from datetime import timedelta
from apps.workspaces.models import Workspace, WorkspaceMember
from rest_framework.exceptions import PermissionDenied, ValidationError
from apps.projects.models import Project, ProjectMember
# from apps.accounts.models import UserModel
from django.db import transaction
from api.v1.notifications.services import NotificationService

class  TasksListService:

    @staticmethod 
    def get_tasks_data(user):
        return {
            "summary": {
                "assigned_to_me": TasksListService.get_assigned_to_me_count(user),
                "due_today": TasksListService.get_due_today_count(user),
                "overdue": TasksListService.get_overdue_count(user),
                "completed_this_week": TasksListService.get_completed_this_week_count(user)
            },
            "tasks": {
                "due_today": TasksListService.get_due_today_queryset(user),
                "overdue": TasksListService.get_overdue_queryset(user),
                "upcoming": TasksListService.get_upcoming_queryset(user)
            }
        }


    @staticmethod
    def get_assigned_to_me_count(user):
        return Task.objects.filter(
            assignee=user
        ).exclude(
            status__in=[TaskStatus.COMPLETED,TaskStatus.CANCELLED]
        ).count()

    @staticmethod
    def get_due_today_count(user):
        return Task.objects.filter(
            assignee=user,
            due_date=timezone.localdate()
        ).exclude(
            status__in=[TaskStatus.COMPLETED, TaskStatus.CANCELLED]
        ).count()

    @staticmethod
    def get_overdue_count(user):
        return Task.objects.filter(
            assignee=user,
            due_date__isnull=False,
            due_date__lt=timezone.localdate()
        ).exclude(
            status__in=[TaskStatus.COMPLETED, TaskStatus.CANCELLED]
        ).count()

    @staticmethod 
    def get_completed_this_week_count(user):

        today = timezone.localdate()
        start_week = today - timedelta(days=today.weekday())

        return Task.objects.filter(
            assignee=user,
            status=TaskStatus.COMPLETED,
            completed_at__isnull=False,
            completed_at__gte=start_week
        ).count()

    @staticmethod 
    def get_due_today_queryset(user):
        return Task.objects.filter(
            assignee=user,
            due_date__isnull=False,
            due_date=timezone.localdate()
        ).exclude(
            status__in=[
                TaskStatus.COMPLETED,
                TaskStatus.CANCELLED
            ]
        ).select_related(
            "workspace",
            "project",
            "parent_task",
            "created_by",
            "created_by__avatar"
        ).order_by(
            "due_date"
        )

    @staticmethod
    def get_overdue_queryset(user):
        return Task.objects.filter(
            assignee=user,
            due_date__isnull=False,
            due_date__lt=timezone.localdate()
        ).exclude(
            status__in=[
                TaskStatus.COMPLETED,
                TaskStatus.CANCELLED
            ]
        ).select_related(
            "workspace",
            "project",
            "parent_task",
            "created_by",
            "created_by__avatar"
        ).order_by(
            "due_date"
        )

    @staticmethod
    def get_upcoming_queryset(user):

        today = timezone.localdate()
        start_week = today - timedelta(days=today.weekday())

        return Task.objects.filter(
            assignee=user,
            due_date__isnull=False,
            due_date__gte=start_week
        ).exclude(
            status__in=[
                TaskStatus.CANCELLED,
                TaskStatus.COMPLETED,
            ]
        ).select_related(
            "workspace",
            "project",
            "parent_task",
            "created_by",
            "created_by__avatar"
        ).order_by(
            "due_date"
        )
    

class NewTaskService:

    @staticmethod
    @transaction.atomic
    def create_task(user, validated_data):
        
        workspace=Workspace.objects.filter(
            id=validated_data["workspace_id"],
            members__user=user
        ).first()

        if workspace is None:
            raise PermissionDenied({
                "You don't have access of this workspace"
            })
        


        
        project_id=validated_data.get("project_id")
        if project_id:
            project=Project.objects.filter(
                id=project_id,
                workspace=workspace,
                members__user=user
            ).first()

            if project is None:
                raise PermissionDenied({
                    "You don't have access of this project"
                })
                
            
        
        assignee_id=validated_data.get("assignee_id")
        if assignee_id:
            
            if project_id:
                assignee=ProjectMember.objects.filter(
                    project=project_id,
                    user=assignee_id
                ).exists()
            else:
                assignee=WorkspaceMember.objects.filter(
                    user=assignee_id,
                    workspace=workspace
                ).exists()

            if not assignee:
                raise ValidationError({
                    "assignee_id": "Selected user can not be assigned to this task"
                })
            
            
            
            
        task=Task.objects.create(
            title=validated_data["title"],
            created_by=user,
            description=validated_data.get("description", ""),
            workspace=workspace,
            priority=validated_data["priority"],
            due_date=validated_data.get("due_date"),
            project=validated_data.get("project_id"),
            assignee=validated_data.get("assignee_id")
        )

        if task.assignee:
          NotificationService.task_assigned(
            actor=user,
            recipient=task.assignee,
            workspace=workspace,
            task=task,
          ) 
            

        return task
            
        

        


