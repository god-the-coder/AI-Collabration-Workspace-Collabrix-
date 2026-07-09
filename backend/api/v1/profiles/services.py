from apps.accounts.models import UserModel
from apps.workspaces.models import WorkspaceMember, Workspace
from apps.projects.models import ProjectMember, Project, ProjectStatus
from apps.tasks.models import Task, TaskStatus
from django.db.models import Subquery, OuterRef



class ProfilePageService:

    @staticmethod
    def get_profile_data(user):
        return {
            "profile": ProfilePageService.get_profile(user),
            "summary": ProfilePageService.get_profile_summary(user),
            "about": ProfilePageService.get_profile(user),
            "workspaces": ProfilePageService.get_profile_workspaces_queryset(user),
            "active_projects": ProfilePageService.get_profile_active_projects_queryset(user),
            # "recent_activity": ProfilePageService.get_recent_activity_queryset(user),
            "contact": ProfilePageService.get_profile(user)
        }

    @staticmethod
    def get_profile(user):
        return UserModel.objects.select_related(
            "avatar"
        ).get(
            id=user.id
        )

    @staticmethod
    def get_profile_summary(user):
        return {
            "workspaces": ProfilePageService.get_workspaces_count(user),
            "projects": ProfilePageService.get_projects_count(user),
            "assigned_tasks": ProfilePageService.get_assigned_tasks_count(user),
            "completed_tasks": ProfilePageService.get_completed_tasks_count(user)
        }
    
    @staticmethod
    def get_workspaces_count(user):
        return WorkspaceMember.objects.filter(
            user=user
        ).count()

    @staticmethod
    def get_projects_count(user):
        return ProjectMember.objects.filter(
            user=user
        ).count()

    @staticmethod
    def get_assigned_tasks_count(user):
        return Task.objects.filter(
            assignee=user
        ).exclude(
            status__in=[
                TaskStatus.COMPLETED,
                TaskStatus.CANCELLED
            ]
        ).count()

    @staticmethod
    def get_completed_tasks_count(user):
        return Task.objects.filter(
            assignee=user,
            status=TaskStatus.COMPLETED
        ).exclude(
            status=TaskStatus.CANCELLED
        ).count()

    # @staticmethod
    # def get_profile_about(user):

    @staticmethod
    def get_profile_workspaces_queryset(user):
      return (
        Workspace.objects.filter(
            members__user=user
        )
        .select_related(
            "logo"
        )
        .annotate(
            role=Subquery(
                WorkspaceMember.objects.filter(
                    workspace=OuterRef("pk"),
                    user=user,
                ).values("role")[:1]
            ),
            user_joined_at=Subquery(
                WorkspaceMember.objects.filter(
                    workspace=OuterRef("pk"),
                    user=user,
                ).values("joined_at")[:1]
            ),
        )
        .order_by("-user_joined_at")
      )

    @staticmethod
    def get_profile_active_projects_queryset(user):
        return Project.objects.filter(
            members__user=user
        ).select_related(
            "workspace"
        ).exclude(
            status__in=[
                TaskStatus.CANCELLED,
                TaskStatus.COMPLETED
            ]
        ).order_by("-updated_at")
    

    # @staticmethod
    # def get_profile_contact(user):
        # pass

    @staticmethod
    def get_recent_activity_queryset(user):
        pass


        

