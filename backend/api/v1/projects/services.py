from apps.projects.models import ProjectMember, Project, ProjectStatus
from django.utils import timezone
from django.db.models import Count, Prefetch


class ProjectsListService:

    @staticmethod
    def get_projects_data(user):
        return {
            "summary": ProjectsListService.get_projects_summary(user),
            "projects": ProjectsListService.get_projects_queryset(user)
        }

    @staticmethod
    def get_projects_summary(user):
        return {
            "total_projects": ProjectsListService.get_total_projects_count(user),
            "active_projects": ProjectsListService.get_active_projects_count(user),
            "completed_projects": ProjectsListService.get_completed_projects_count(user),
            "projects_at_risk": ProjectsListService.get_projects_at_risk(user)
        }

    @staticmethod
    def get_projects_queryset(user):
        return Project.objects.filter(
            members__user=user
        ).select_related(
            "workspace"
        ).prefetch_related(
            Prefetch(
                "members",
                queryset=ProjectMember.objects.select_related(
                    "user",
                    "user__avatar"
                )
            )
        ).annotate(
            members_count=Count(
                "members",
                distinct=True
            )
        ).order_by("-updated_at")



    @staticmethod
    def get_total_projects_count(user):
        return Project.objects.filter(
            members__user=user,
            is_archived=False,
            is_deleted=False
        ).distinct().count()

    @staticmethod
    def get_active_projects_count(user):
        return ProjectMember.objects.filter(
            user=user,
            project__status=ProjectStatus.ACTIVE,
            project__is_archived=False,
            project__is_deleted=False
        ).distinct().count()

    @staticmethod
    def get_completed_projects_count(user):
        return Project.objects.filter(
            members__user=user,
            status=ProjectStatus.COMPLETED,
            is_archived=False,
            is_deleted=False
        ).count()

    @staticmethod
    def get_projects_at_risk(user):
        return Project.objects.filter(
            members__user=user,
            is_archived=False,
            is_deleted=False,
            due_date__lt=timezone.now()
        ).exclude(
            status__in= [
                ProjectStatus.COMPLETED,
                ProjectStatus.CANCELLED
            ]
        ).count()