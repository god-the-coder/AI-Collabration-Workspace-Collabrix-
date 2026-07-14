from apps.workspaces.models import WorkspaceMember, Invitation, InvitationStatus, Workspace
from apps.projects.models import Project, ProjectStatus, ProjectMember
from apps.workspaces.models import Workspace, WorkspaceRole
from apps.files.models import File, FileType
from django.db.models import Count, OuterRef, Subquery, Prefetch
from django.utils.text import slugify
from rest_framework.exceptions import PermissionDenied
from apps.tasks.models import Task, TaskStatus
from django.utils import timezone




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

    @staticmethod
    def create_workspace(user, validated_data):

        slug = slugify(validated_data["name"])
        
        workspace = Workspace.objects.create(
            owner=user,
            name=validated_data["name"],
            description=validated_data.get("description", ""),
            slug=slug
        )


        if "logo" in validated_data:
            file = File.objects.create(
                workspace=workspace,
                uploaded_by=user,
                original_name=validated_data["logo"].name,
                file= validated_data["logo"],
                mime_type= validated_data["logo"].content_type,
                file_type=FileType.IMAGE,
                file_size=validated_data["logo"].size
            )

            workspace.logo=file
            workspace.save(update_fields=["logo"])

        WorkspaceMember.objects.create(
            user=user,
            workspace=workspace,
            role=WorkspaceRole.OWNER
        )   


        return workspace

    @staticmethod
    def workspace_layout_summary(user, workspace_id):
        
        workspace=Workspace.objects.filter(
            id=workspace_id,
            members__user=user
        ).select_related(
            "logo"
        ).annotate(
            role=Subquery(
                WorkspaceMember.objects.filter(
                    workspace=OuterRef("pk"),
                    user=user
                ).values("role")[:1]
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
                "tasks",
                distinct=True
            )

        ).first()

        if workspace is None:
            raise PermissionDenied(
                "You don't have permission to access this workspace"
            )

        return workspace



class WorkspaceDetailSerivce:


# <----------------------- overview ----------------------------->

    @staticmethod
    def get_overview_data(user, workspace_id):

        workspace=Workspace.objects.filter(
            members__user=user,
            id=workspace_id
        ).exists()

        if not workspace:
            raise PermissionDenied(
                "You don't have access to this workspace"
            )


        return {
            "summary": WorkspaceDetailSerivce.get_overview_summary(workspace_id),
            "active_projects": WorkspaceDetailSerivce.get_active_projects(workspace_id)
        }

    @staticmethod
    def get_overview_summary(workspace_id):
        return {
            "active_projects": WorkspaceDetailSerivce.get_active_projects_count(workspace_id),
            "tasks_due_today": WorkspaceDetailSerivce.get_tasks_due_today_count(workspace_id),
            "pending_reviews": WorkspaceDetailSerivce.get_pending_reviews_count(workspace_id),
            "over_due_tasks": WorkspaceDetailSerivce.get_tasks_due_today_count(workspace_id)
        }
    
    @staticmethod
    def get_active_projects_count(workspace_id):
        return Project.objects.filter(
            workspace=workspace_id,
            status=ProjectStatus.ACTIVE,
            is_archived=False,
            is_deleted=False
        ).count()

    @staticmethod
    def get_tasks_due_today_count(workspace_id):
        return Task.objects.filter(
            workspace=workspace_id,
            due_date=timezone.localdate()
        ).exclude(
            status__in=[
                TaskStatus.CANCELLED,
                TaskStatus.COMPLETED,
            ]
        ).count()
    
    @staticmethod
    def get_pending_reviews_count(workspace_id):
        return Task.objects.filter(
            workspace=workspace_id,
            status=TaskStatus.IN_REVIEW
        ).count()
    
    @staticmethod
    def get_over_due_task_count(workspace_id):
        return Task.objects.filter(
            workspace=workspace_id,
            due_date__lt=timezone.localdate()
        ).exclude(
            status__in=[
                TaskStatus.CANCELLED,
                TaskStatus.COMPLETED
            ]
        ).count()        

    @staticmethod
    def get_active_projects(workspace_id):
        project = Project.objects.filter(
            workspace=workspace_id,
            status=ProjectStatus.ACTIVE,
            is_archived=False,
            is_deleted=False,
        ).annotate(
            members_count=Count("members", distinct=True)
        ).prefetch_related(
            Prefetch(
                "members",
                queryset=ProjectMember.objects.select_related(
                    "user",
                    "user__avatar"
                )
            )
        ).order_by("-updated_at")

        return project


# <---------------------- projects --------------------------->

    @staticmethod
    def get_projects_data(user, workspace_id):

        has_access = Workspace.objects.filter(
            id=workspace_id,
            members__user=user
        ).exists()

        if not has_access:
            raise PermissionDenied(
                "You don't have permission to access this workspace."
            )


        return {
            "summary": WorkspaceDetailSerivce.get_projects_summary(workspace_id),
            # "filters": ,
            "projects": WorkspaceDetailSerivce.get_all_projects(workspace_id),
            # "pagination": ,
        }
    
    
    @staticmethod
    def get_projects_summary(workspace_id):
        return {
            "active_projects": WorkspaceDetailSerivce.get_active_projects_count(workspace_id),
            "completed_projects": WorkspaceDetailSerivce.get_completed_projects_count(workspace_id),
            "at_risk_projects": WorkspaceDetailSerivce.get_atrisk_projects_count(workspace_id),
            "archived_projects": WorkspaceDetailSerivce.get_archived_projects_count(workspace_id)
        }
    

    @staticmethod
    def get_completed_projects_count(workspace_id):
        return Project.objects.filter(
            workspace=workspace_id,
            status=ProjectStatus.COMPLETED,
            is_archived=False,
            is_deleted=False
        ).count()
    
    @staticmethod
    def get_atrisk_projects_count(workspace_id):
        return Project.objects.filter(
            workspace=workspace_id,
            status=ProjectStatus.AT_RISK,
            is_archived=False,
            is_deleted=False
        ).count()
    
    @staticmethod
    def get_archived_projects_count(workspace_id):
        return Project.objects.filter(
            workspace=workspace_id,
            is_archived=True,
            is_deleted=False
        ).count()
        
    @staticmethod   
    def get_all_projects(workspace_id):
        project = Project.objects.filter(
            workspace=workspace_id,
            is_archived=False,
            is_deleted=False,
        ).annotate(
            members_count=Count("members", distinct=True)
        ).prefetch_related(
            Prefetch(
                "members",
                queryset=ProjectMember.objects.select_related(
                    "user",
                    "user__avatar"
                )
            )
        ).order_by("-updated_at")

        return project

  

