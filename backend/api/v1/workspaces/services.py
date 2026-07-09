from apps.workspaces.models import WorkspaceMember, Invitation, InvitationStatus, Workspace
from apps.projects.models import Project, ProjectStatus
from django.db.models import Count, OuterRef, Subquery, Prefetch




class WorkspaceService:

    @staticmethod
    def get_workspaces_data(user):

        return {
            "summary": WorkspaceService.get_workspaces_summary(user),
            "workspaces": WorkspaceService.get_user_workspaces(user)
        }

    @staticmethod
    def get_user_workspaces(user):
        return (
            Workspace.objects.filter(
                members__user=user
            ).select_related(
                "logo",
                "owner"
            ).prefetch_related(
                Prefetch(
                    "members",
                    queryset=WorkspaceMember.objects.select_related(
                        "user",
                        "user__avatar"
                    )
                )
            ).annotate(

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
                members_count=Count(
                    "members",
                    distinct=True
                ),

                projects_count=Count(
                    "projects",
                    distinct=True
                ),

                tasks_count=Count(
                    "projects__tasks",
                    distinct=True
                )
            ).order_by("-user_joined_at")

        )
    
    @staticmethod
    def get_workspaces_summary(user):
        
        return {
            "workspaces_joined": WorkspaceService.get_workspaces_joined_count(user),
            "active_projects": WorkspaceService.get_active_projects_count(user),
            "pending_invitations": WorkspaceService.get_pending_invitations_count(user),
            "members_across_workspaces": WorkspaceService.get_members_across_workspaces(user) 

        }

    @staticmethod
    def get_active_projects_count(user):
        
        return Project.objects.filter(
            workspace__members__user=user,
            status=ProjectStatus.ACTIVE,
            is_archived=False,
            is_deleted=False
        ).distinct().count()

    @staticmethod
    def get_workspaces_joined_count(user):
        
        return WorkspaceMember.objects.filter(
            user=user
        ).count()

    @staticmethod
    def get_pending_invitations_count(user):
        
        return Invitation.objects.filter(
            status=InvitationStatus.PENDING,
            email=user.email
        ).count()

    @staticmethod
    def get_members_across_workspaces(user):
        
        user_workspaces = WorkspaceMember.objects.filter(
            user=user
        ).values(
            "workspace"
        )

        return WorkspaceMember.objects.filter(
            workspace__in=user_workspaces
        ).values(
            "user"
        ).exclude(
            user=user
        ).distinct().count()

