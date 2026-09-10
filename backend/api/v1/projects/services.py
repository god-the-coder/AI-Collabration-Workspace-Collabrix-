from apps.projects.models import ProjectMember, Project, ProjectStatus, ProjectRole
from django.utils import timezone
from django.db.models import Count, Prefetch, Q, Subquery, OuterRef
from apps.workspaces.models import Workspace, WorkspaceRole, WorkspaceMember
from apps.files.models import File, FileType
from rest_framework.exceptions import PermissionDenied, NotFound
from apps.tasks.models import TaskStatus, Task
from .serializers import TaskCardSerializer
from datetime import timedelta
from api.v1.notifications.services import NotificationService

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
            "workspace",
            "logo"
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


class NewProjectService:

    @staticmethod
    def create_project(user, validated_data):

        workspace=Workspace.objects.filter(
            id=validated_data["workspace_id"],
            members__user=user,
            members__role__in=[
                WorkspaceRole.OWNER,
                WorkspaceRole.ADMIN
            ]
        ).first()

        if workspace is None:
            raise PermissionDenied(
                "You don't have access to this workspace"
            )
        
        project=Project.objects.create(
            owner=user,
            name=validated_data["name"],
            description=validated_data.get("description", ""),
            due_date=validated_data.get("due_date"),
            workspace=workspace,
            start_date=validated_data["start_date"],
            status=validated_data["status"]
        )

        ProjectMember.objects.create(
          project=project,
          user=user,
          role=ProjectRole.ADMIN,
        )

        NotificationService.project_created(
          actor=user,
          workspace=workspace,
          project=project,
        )



        return project

class ProjectDetailService:

    @staticmethod
    def get_project(project_id, user):

        project = (
            Project.objects.filter(
                id=project_id,
                members__user=user
            )
            .select_related(
                "workspace",
                "logo"
            )
            .annotate(
                members_count=Count(
                    "members",
                    distinct=True
                ),
                total_tasks=Count(
                    "tasks",
                    distinct=True
                ),
                completed_tasks=Count(
                    "tasks",
                    filter=Q(
                        tasks__status=TaskStatus.COMPLETED
                    ),
                    distinct=True
                )
            )
            .first()
        )

        if project is None:
            raise PermissionDenied(
                "You don't have access to this project."
            )

        return project

    @staticmethod
    def update_logo(user, project_id, logo_file):

        project = (
            Project.objects
            .filter(id=project_id)
            .select_related("logo")
            .first()
        )

        if project is None:
            raise NotFound("Project not found.")

        membership = ProjectMember.objects.filter(
            project=project,
            user=user
        ).first()

        if membership is None or membership.role != ProjectRole.ADMIN:
            raise PermissionDenied(
                "Only project admins can update the project logo."
            )

        extension = (
            logo_file.name.rsplit(".", 1)[-1]
            if "." in logo_file.name
            else ""
        )

        file = File.objects.create(
            workspace=project.workspace,
            uploaded_by=user,
            original_name=logo_file.name,
            file=logo_file,
            mime_type=logo_file.content_type,
            file_type=FileType.IMAGE,
            extension=extension,
            file_size=logo_file.size,
        )

        project.logo = file
        project.save(update_fields=["logo"])

        return project


class ProjectOverviewService:

    @staticmethod
    def get_overview(user, project_id):

        project = (
            Project.objects.filter(
                id=project_id,
                members__user=user
            )
            .select_related(
                "workspace"
            )
            .annotate(

                members_count=Count(
                    "members",
                    distinct=True
                ),

                total_tasks=Count(
                    "tasks",
                    distinct=True
                ),

                todo_tasks=Count(
                    "tasks",
                    filter=Q(tasks__status=TaskStatus.TODO),
                    distinct=True
                ),

                in_progress_tasks=Count(
                    "tasks",
                    filter=Q(tasks__status=TaskStatus.IN_PROGRESS),
                    distinct=True
                ),

                review_tasks=Count(
                    "tasks",
                    filter=Q(tasks__status=TaskStatus.IN_REVIEW),
                    distinct=True
                ),

                completed_tasks=Count(
                    "tasks",
                    filter=Q(tasks__status=TaskStatus.COMPLETED),
                    distinct=True
                ),

                overdue_tasks=Count(
                    "tasks",
                    filter=(
                        Q(tasks__due_date__lt=timezone.localdate())
                        &
                        ~Q(tasks__status__in=[
                            TaskStatus.COMPLETED,
                            TaskStatus.CANCELLED
                        ])
                    ),
                    distinct=True
                )

            )
            .first()
        )

        if project is None:
            raise PermissionDenied(
                "You don't have access to this project."
            )

        return project
    

class ProjectTasksService:

    @staticmethod
    def get_project_tasks(user, project_id):

        has_access = Project.objects.filter(
            id=project_id,
            members__user=user
        ).exists()

        if not has_access:
            raise PermissionDenied(
                "You don't have access to this project."
            )

        tasks = (
            Task.objects.filter(
                project_id=project_id
            )
            .select_related(
                "assignee",
                "assignee__avatar"
            )
            .order_by(
                "created_at"
            )
        )

        summary = {
            "todo": 0,
            "in_progress": 0,
            "review": 0,
            "completed": 0,
        }

        grouped_tasks = {
            "todo": [],
            "in_progress": [],
            "review": [],
            "completed": [],
        }

        for task in tasks:

            task_data = TaskCardSerializer(task).data

            if task.status == TaskStatus.TODO:
                summary["todo"] += 1
                grouped_tasks["todo"].append(task_data)

            elif task.status == TaskStatus.IN_PROGRESS:
                summary["in_progress"] += 1
                grouped_tasks["in_progress"].append(task_data)

            elif task.status == TaskStatus.IN_REVIEW:
                summary["review"] += 1
                grouped_tasks["review"].append(task_data)

            elif task.status == TaskStatus.COMPLETED:
                summary["completed"] += 1
                grouped_tasks["completed"].append(task_data)

        return {
            "summary": summary,
            "tasks": grouped_tasks
        }
    


class ProjectMembersService:

    @staticmethod
    def get_members(user, project_id):

        project = Project.objects.filter(
            id=project_id,
            members__user=user
        ).first()

        if project is None:
            raise PermissionDenied(
                "You don't have access to this project."
            )

        members = (
            ProjectMember.objects.filter(
                project=project
            )
            .select_related(
                "user",
                "user__avatar"
            )
            .annotate(

                workspace_role=Subquery(
                    WorkspaceMember.objects.filter(
                        workspace=project.workspace,
                        user=OuterRef("user")
                    ).values("role")[:1]
                ),

                assigned_tasks=Count(
                    "user__tasks_assigned",
                    distinct=True
                )

            )
            .order_by("user__username")
        )

        return {
            "members": members
        }

