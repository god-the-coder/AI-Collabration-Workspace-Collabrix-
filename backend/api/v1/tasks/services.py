from apps.tasks.models import Task , TaskStatus
from django.utils import timezone
from datetime import timedelta

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