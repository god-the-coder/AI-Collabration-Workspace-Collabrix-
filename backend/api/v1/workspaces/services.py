from apps.workspaces.models import WorkspaceMember, Invitation, InvitationStatus, Workspace
from apps.projects.models import Project, ProjectStatus, ProjectMember
from apps.workspaces.models import Workspace, WorkspaceRole
from apps.files.models import File, FileType
from apps.accounts.models import UserModel
from apps.notifications.models import Notification, NotificationType, NotificationTargetType
from apps.audit.models import EventLog, EventType, EventResourceType
from django.db.models import Count, OuterRef, Subquery, Prefetch
from django.utils.text import slugify
from rest_framework.exceptions import PermissionDenied, NotFound, ValidationError
from apps.tasks.models import Task, TaskStatus
from django.utils import timezone
from datetime import timedelta
from django.db import transaction
from django.core.mail import send_mail
from django.conf import settings
import uuid
from api.v1.notifications.services import NotificationService




# class WorkspaceService:

#     @staticmethod
#     @transaction.atomic
#     def leave_workspace(user, workspace_id):

#         workspace = Workspace.objects.filter(id=workspace_id).select_related("owner").first()
#         if workspace is None:
#             raise NotFound("Workspace not found")

#         membership = WorkspaceMember.objects.filter(workspace=workspace, user=user).first()
#         if membership is None:
#             raise PermissionDenied("You are not a member of this workspace")

#         if workspace.owner_id == user.id:
#             raise PermissionDenied("Workspace owner cannot leave the workspace")

#         # delete membership
#         membership.delete()

#         # Notification: reuse NotificationService if it exposes a suitable method.
#         try:
#             NotificationService.workspace_member_removed(
#                 actor=user,
#                 workspace=workspace,
#                 member=user
#             )
#         except Exception:
#             # silently ignore missing notification helper (we must not duplicate notification logic)
#             pass

#         # Recent activity / audit log: use existing EventLog model from audit app.
#         try:
#             EventLog.objects.create(
#                 event_type="WORKSPACE_MEMBER_REMOVED",
#                 title="Workspace member removed",
#                 description=f"{user.username} left workspace '{workspace.name}'",
#                 resource_type="WORKSPACE",
#                 resource_id=workspace.id,
#                 metadata={"member_id": str(user.id)},
#                 actor=user
#             )
#         except Exception:
#             # don't let audit logging failures block the main operation
#             pass

#         return {"detail": "Left workspace successfully"}


#     @staticmethod
#     @transaction.atomic
#     def update_workspace_settings(user, workspace_id, validated_data):
#         """
#         Update allowed workspace settings.
#         Rules:
#         - Only workspace OWNER can update settings.
#         - Validate workspace exists.
#         - Validate membership (owner must be a member by model).
#         - Update only allowed fields.
#         - Return updated WorkspaceSetting instance.
#         - Create recent activity via EventLog.
#         - Create notification only if project notifies admins/owners about settings changes.
#         """

#         workspace = Workspace.objects.filter(id=workspace_id).select_related("owner", "setting_for_workspace").first()
#         if workspace is None:
#             raise NotFound("Workspace not found")

#         workspace=Workspace.objects.filter(
#             members__user=user,
#             id=workspace_id
#         ).exists()

#         if not workspace:
#             raise PermissionDenied(
#                 "You don't have access to this workspace"
#             )


#         return {
#             "summary": WorkspaceDetailSerivce.get_overview_summary(workspace_id),
#             "active_projects": WorkspaceDetailSerivce.get_active_projects(workspace_id)
#         }

#     @staticmethod
#     def get_overview_summary(workspace_id):
#         return {
#             "active_projects": WorkspaceDetailSerivce.get_active_projects_count(workspace_id),
#             "tasks_due_today": WorkspaceDetailSerivce.get_tasks_due_today_count(workspace_id),
#             "pending_reviews": WorkspaceDetailSerivce.get_pending_reviews_count(workspace_id),
#             "over_due_tasks": WorkspaceDetailSerivce.get_tasks_due_today_count(workspace_id)
#         }
    
#     @staticmethod
#     def get_active_projects_count(workspace_id):
#         return Project.objects.filter(
#             workspace=workspace_id,
#             status=ProjectStatus.ACTIVE,
#             is_archived=False,
#             is_deleted=False
#         ).count()

#     @staticmethod
#     def get_tasks_due_today_count(workspace_id):
#         return Task.objects.filter(
#             workspace=workspace_id,
#             due_date=timezone.localdate()
#         ).exclude(
#             status__in=[
#                 TaskStatus.CANCELLED,
#                 TaskStatus.COMPLETED,
#             ]
#         ).count()
    
#     @staticmethod
#     def get_pending_reviews_count(workspace_id):
#         return Task.objects.filter(
#             workspace=workspace_id,
#             status=TaskStatus.IN_REVIEW
#         ).count()
    
#     @staticmethod
#     def get_over_due_task_count(workspace_id):
#         return Task.objects.filter(
#             workspace=workspace_id,
#             due_date__lt=timezone.localdate()
#         ).exclude(
#             status__in=[
#                 TaskStatus.CANCELLED,
#                 TaskStatus.COMPLETED
#             ]
#         ).count()        

#     @staticmethod
#     def get_active_projects(workspace_id):
#         project = Project.objects.filter(
#             workspace=workspace_id,
#             status=ProjectStatus.ACTIVE,
#             is_archived=False,
#             is_deleted=False,
#         ).annotate(
#             members_count=Count("members", distinct=True)
#         ).prefetch_related(
#             Prefetch(
#                 "members",
#                 queryset=ProjectMember.objects.select_related(
#                     "user",
#                     "user__avatar"
#                 )
#             )
#         ).order_by("-updated_at")

#         return project


# # <---------------------- projects --------------------------->

#     @staticmethod
#     def get_projects_data(user, workspace_id):

#         has_access = Workspace.objects.filter(
#             id=workspace_id,
#             members__user=user
#         ).exists()

#         if not has_access:
#             raise PermissionDenied(
#                 "You don't have permission to access this workspace."
#             )


#         return {
#             "summary": WorkspaceDetailSerivce.get_projects_summary(workspace_id),
#             # "filters": ,
#             "projects": WorkspaceDetailSerivce.get_all_projects(workspace_id),
#             # "pagination": ,
#         }
    
    
#     @staticmethod
#     def get_projects_summary(workspace_id):
#         return {
#             "active_projects": WorkspaceDetailSerivce.get_active_projects_count(workspace_id),
#             "completed_projects": WorkspaceDetailSerivce.get_completed_projects_count(workspace_id),
#             "at_risk_projects": WorkspaceDetailSerivce.get_atrisk_projects_count(workspace_id),
#             "archived_projects": WorkspaceDetailSerivce.get_archived_projects_count(workspace_id)
#         }
    

#     @staticmethod
#     def get_completed_projects_count(workspace_id):
#         return Project.objects.filter(
#             workspace=workspace_id,
#             status=ProjectStatus.COMPLETED,
#             is_archived=False,
#             is_deleted=False
#         ).count()
    
#     @staticmethod
#     def get_atrisk_projects_count(workspace_id):
#         return Project.objects.filter(
#             workspace=workspace_id,
#             status=ProjectStatus.AT_RISK,
#             is_archived=False,
#             is_deleted=False
#         ).count()
    
#     @staticmethod
#     def get_archived_projects_count(workspace_id):
#         return Project.objects.filter(
#             workspace=workspace_id,
#             is_archived=True,
#             is_deleted=False
#         ).count()
        
#     @staticmethod   
#     def get_all_projects(workspace_id):
#         project = Project.objects.filter(
#             workspace=workspace_id,
#             is_archived=False,
#             is_deleted=False,
#         ).annotate(
#             members_count=Count("members", distinct=True)
#         ).prefetch_related(
#             Prefetch(
#                 "members",
#                 queryset=ProjectMember.objects.select_related(
#                     "user",
#                     "user__avatar"
#                 )
#             )
#         ).order_by("-updated_at")

#         return project

class WorkspaceService:

    # ============================================================
    # LEAVE WORKSPACE
    # ============================================================

    @staticmethod
    @transaction.atomic
    def leave_workspace(user, workspace_id):

        workspace = (
            Workspace.objects
            .filter(id=workspace_id)
            .select_related("owner")
            .first()
        )

        if workspace is None:
            raise NotFound("Workspace not found")

        membership = WorkspaceMember.objects.filter(
            workspace=workspace,
            user=user
        ).first()

        if membership is None:
            raise PermissionDenied(
                "You are not a member of this workspace"
            )

        if workspace.owner_id == user.id:
            raise PermissionDenied(
                "Workspace owner cannot leave the workspace"
            )

        membership.delete()

        # Notification
        try:
            NotificationService.workspace_member_removed(
                actor=user,
                workspace=workspace,
                member=user
            )
        except Exception:
            pass

        # Recent activity
        try:
            EventLog.objects.create(
                event_type="WORKSPACE_MEMBER_REMOVED",
                title="Workspace member removed",
                description=(
                    f"{user.username} left workspace "
                    f"'{workspace.name}'"
                ),
                resource_type="WORKSPACE",
                resource_id=workspace.id,
                metadata={
                    "member_id": str(user.id)
                },
                actor=user
            )
        except Exception:
            pass

        return {
            "detail": "Left workspace successfully"
        }


    # ============================================================
    # WORKSPACE SETTINGS
    # ============================================================

    @staticmethod
    @transaction.atomic
    def update_workspace_settings(
        user,
        workspace_id,
        validated_data
    ):
        """
        Update allowed workspace settings.

        Rules:
        - Only workspace OWNER can update settings.
        - Validate workspace exists.
        - Validate membership.
        - Update only supplied fields.
        - Return updated WorkspaceSetting instance.
        - Create recent activity.
        """

        workspace = (
            Workspace.objects
            .filter(id=workspace_id)
            .select_related(
                "owner",
                "setting_for_workspace"
            )
            .first()
        )

        if workspace is None:
            raise NotFound(
                "Workspace not found"
            )

        membership = WorkspaceMember.objects.filter(
            workspace=workspace,
            user=user
        ).first()

        if membership is None:
            raise PermissionDenied(
                "You don't have access to this workspace"
            )

        if membership.role != WorkspaceRole.OWNER:
            raise PermissionDenied(
                "Only workspace owner can update settings"
            )

        workspace_settings = getattr(
            workspace,
            "setting_for_workspace",
            None
        )

        if workspace_settings is None:
            raise NotFound(
                "Workspace settings not found"
            )

        for field, value in validated_data.items():
            setattr(
                workspace_settings,
                field,
                value
            )

        if validated_data:
            workspace_settings.save(
                update_fields=list(
                    validated_data.keys()
                )
            )

        try:
            EventLog.objects.create(
                workspace=workspace,
                actor=user,
                event_type=EventType.WORKSPACE_UPDATED,
                title="Workspace settings updated",
                description=(
                    f"{user.username} updated settings "
                    f"for '{workspace.name}'."
                ),
                resource_type=EventResourceType.WORKSPACE,
                resource_id=workspace.id,
                metadata={
                    "updated_fields": list(
                        validated_data.keys()
                    )
                }
            )
        except Exception:
            pass

        return workspace_settings


    # ============================================================
    # WORKSPACE OVERVIEW
    # ============================================================

    @staticmethod
    def get_overview_summary(workspace_id):

        return {
            "active_projects": (
                WorkspaceService
                .get_active_projects_count(
                    workspace_id
                )
            ),

            "tasks_due_today": (
                WorkspaceService
                .get_tasks_due_today_count(
                    workspace_id
                )
            ),

            "pending_reviews": (
                WorkspaceService
                .get_pending_reviews_count(
                    workspace_id
                )
            ),

            "over_due_tasks": (
                WorkspaceService
                .get_over_due_task_count(
                    workspace_id
                )
            )
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
                TaskStatus.COMPLETED
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

        projects = (
            Project.objects
            .filter(
                workspace=workspace_id,
                status=ProjectStatus.ACTIVE,
                is_archived=False,
                is_deleted=False
            )
            .annotate(
                members_count=Count(
                    "members",
                    distinct=True
                )
            )
            .prefetch_related(
                Prefetch(
                    "members",
                    queryset=(
                        ProjectMember.objects
                        .select_related(
                            "user",
                            "user__avatar"
                        )
                    )
                )
            )
            .order_by("-updated_at")
        )

        return projects


    # ============================================================
    # PROJECTS
    # ============================================================

    @staticmethod
    def get_projects_data(
        user,
        workspace_id
    ):

        has_access = Workspace.objects.filter(
            id=workspace_id,
            members__user=user
        ).exists()

        if not has_access:
            raise PermissionDenied(
                "You don't have permission to access this workspace."
            )

        return {
            "summary": (
                WorkspaceService
                .get_projects_summary(
                    workspace_id
                )
            ),

            # "filters": ,

            "projects": (
                WorkspaceService
                .get_all_projects(
                    workspace_id
                )
            ),

            # "pagination": ,
        }


    @staticmethod
    def get_projects_summary(workspace_id):

        return {
            "active_projects": (
                WorkspaceService
                .get_active_projects_count(
                    workspace_id
                )
            ),

            "completed_projects": (
                WorkspaceService
                .get_completed_projects_count(
                    workspace_id
                )
            ),

            "at_risk_projects": (
                WorkspaceService
                .get_atrisk_projects_count(
                    workspace_id
                )
            ),

            "archived_projects": (
                WorkspaceService
                .get_archived_projects_count(
                    workspace_id
                )
            )
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

        projects = (
            Project.objects
            .filter(
                workspace=workspace_id,
                is_archived=False,
                is_deleted=False
            )
            .annotate(
                members_count=Count(
                    "members",
                    distinct=True
                )
            )
            .prefetch_related(
                Prefetch(
                    "members",
                    queryset=(
                        ProjectMember.objects
                        .select_related(
                            "user",
                            "user__avatar"
                        )
                    )
                )
            )
            .order_by("-updated_at")
        )

        return projects


# <-------------------- Members --------------------------------->

# class WorkspaceMembersService:

#     @staticmethod
#     def get_members_data(user, workspace_id):

#         has_access = Workspace.objects.filter(
#             id=workspace_id,
#             members__user=user
#         ).exists()

#         if not has_access:
#             raise PermissionDenied(
#                 "You don't have access to this workspace."
#             )

#         return {
#             "summary": WorkspaceMembersService.get_summary(workspace_id),
#             "members": WorkspaceMembersService.get_members_queryset(workspace_id)
#         }
    

#     @staticmethod
#     def get_summary(workspace_id):
#           return {
#             "total_members": WorkspaceMembersService.get_total_members_count(workspace_id),
#             "online_members": WorkspaceMembersService.get_online_members_count(workspace_id),
#             "admins": WorkspaceMembersService.get_admins_count(workspace_id),
#             "pending_invites": WorkspaceMembersService.get_pending_invites_count(workspace_id),
#            }  

#     @staticmethod
#     def get_total_members_count(workspace_id):
#       return WorkspaceMember.objects.filter(
#         workspace_id=workspace_id
#       ).count()  
    

#     @staticmethod
#     def get_admins_count(workspace_id):
#       return WorkspaceMember.objects.filter(
#         workspace_id=workspace_id,
#         role__in=[
#             WorkspaceRole.ADMIN,
#             WorkspaceRole.OWNER
#         ]
#       ).count()
    
#     @staticmethod
#     def get_pending_invites_count(workspace_id):
#       return Invitation.objects.filter(
#         workspace_id=workspace_id,
#         status=InvitationStatus.PENDING
#       ).count()
    

#     @staticmethod
#     def get_online_members_count(workspace_id):

#       threshold = timezone.now() - timedelta(minutes=5)

#       return WorkspaceMember.objects.filter(
#         workspace_id=workspace_id,
#         user__sessions__last_active_at__gte=threshold,
#         user__sessions__revoked_at__isnull=True
#       ).distinct().count()
    


#     @staticmethod
#     def get_members_queryset(workspace_id):

#       return WorkspaceMember.objects.filter(
#         workspace_id=workspace_id
#       ).select_related(
#         "user",
#         "user__avatar"
#       ).order_by(
#         "joined_at"
#       )


class WorkspaceMembersService:

    @staticmethod
    def get_members_data(user, workspace_id):

        has_access = Workspace.objects.filter(
            id=workspace_id,
            members__user=user
        ).exists()

        if not has_access:
            raise PermissionDenied(
                "You don't have access to this workspace."
            )

        return {
            "summary": WorkspaceMembersService.get_summary(
                workspace_id
            ),
            "members": WorkspaceMembersService.get_members_queryset(
                workspace_id
            )
        }

    @staticmethod
    def get_summary(workspace_id):

        return {
            "total_members": (
                WorkspaceMembersService
                .get_total_members_count(workspace_id)
            ),

            "online_members": (
                WorkspaceMembersService
                .get_online_members_count(workspace_id)
            ),

            "admins": (
                WorkspaceMembersService
                .get_admins_count(workspace_id)
            ),

            "pending_invites": (
                WorkspaceMembersService
                .get_pending_invites_count(workspace_id)
            ),
        }

    @staticmethod
    def get_total_members_count(workspace_id):

        return WorkspaceMember.objects.filter(
            workspace_id=workspace_id
        ).count()

    @staticmethod
    def get_admins_count(workspace_id):

        return WorkspaceMember.objects.filter(
            workspace_id=workspace_id,
            role__in=[
                WorkspaceRole.ADMIN,
                WorkspaceRole.OWNER
            ]
        ).count()

    @staticmethod
    def get_pending_invites_count(workspace_id):

        return Invitation.objects.filter(
            workspace_id=workspace_id,
            status=InvitationStatus.PENDING
        ).count()

    @staticmethod
    def get_online_members_count(workspace_id):

        threshold = timezone.now() - timedelta(minutes=5)

        return (
            WorkspaceMember.objects
            .filter(
                workspace_id=workspace_id,
                user__sessions__last_active_at__gte=threshold,
                user__sessions__revoked_at__isnull=True
            )
            .distinct()
            .count()
        )

    @staticmethod
    def get_members_queryset(workspace_id):

        return (
            WorkspaceMember.objects
            .filter(
                workspace_id=workspace_id
            )
            .select_related(
                "user",
                "user__avatar"
            )
            .order_by(
                "joined_at"
            )
        )


# class InvitationService:

#     @staticmethod
#     def _send_invitation_email(invitation, workspace, inviter):
#         recipient_email = invitation.email
#         if not recipient_email:
#             return

#         frontend_url = getattr(settings, "FRONTEND_URL", "http://localhost:3000")
#         accept_url = f"{frontend_url.rstrip('/')}/invitations/accept/{invitation.token}"
#         subject = f"You’re invited to join {workspace.name}"
#         message = (
#             f"{inviter.username} invited you to join the workspace '{workspace.name}'.\n"
#             f"Accept the invitation here: {accept_url}"
#         )

#         try:
#             send_mail(
#                 subject=subject,
#                 message=message,
#                 from_email=getattr(settings, "DEFAULT_FROM_EMAIL", "no-reply@example.com"),
#                 recipient_list=[recipient_email],
#                 fail_silently=False,
#             )
#         except Exception:
#             return

#     @staticmethod
#     def _log_invitation_event(workspace, actor, event_type, title, description, invitation, recipient_email, role):
#         EventLog.objects.create(
#             workspace=workspace,
#             actor=actor,
#             event_type=event_type,
#             title=title,
#             description=description,
#             resource_type=EventResourceType.INVITATION,
#             resource_id=invitation.id,
#             metadata={
#                 "email": recipient_email,
#                 "role": role,
#             },
#         )

#     @staticmethod
#     def invite_member(user, workspace_id, validated_data):

#         workspace = (
#             Workspace.objects.filter(id=workspace_id)
#             .select_related("setting_for_workspace")
#             .first()
#         )

#         if workspace is None:
#             raise NotFound("Workspace not found.")

#         membership = WorkspaceMember.objects.filter(
#             workspace=workspace,
#             user=user,
#         ).first()

#         if membership is None:
#             raise PermissionDenied(
#                 "You don't have access to this workspace."
#             )

#         setting = getattr(workspace, "setting_for_workspace", None)
#         allow_member_invites = (
#             setting.allow_member_invites if setting else False
#         )

#         if not allow_member_invites:
#             if membership.role != WorkspaceRole.OWNER:
#                 raise PermissionDenied(
#                     "Only workspace owner can invite members."
#                 )
#         else:
#             if membership.role not in [
#                 WorkspaceRole.OWNER,
#                 WorkspaceRole.ADMIN,
#             ]:
#                 raise PermissionDenied(
#                     "You don't have permission to invite members."
#                 )

#         email = validated_data["email"]
#         role = validated_data["role"]

#         is_existing_member = WorkspaceMember.objects.filter(
#             workspace=workspace,
#             user__email=email,
#         ).exists()

#         if is_existing_member:
#             raise ValidationError(
#                 "This user is already a member of this workspace."
#             )

#         existing_invitation = Invitation.objects.filter(
#             workspace=workspace,
#             email=email,
#         ).first()

#         if existing_invitation:

#             if (
#                 existing_invitation.status == InvitationStatus.PENDING
#                 and existing_invitation.expires_at > timezone.now()
#             ):
#                 raise ValidationError(
#                     "An active invitation already exists for this email."
#                 )

#             existing_invitation.token = uuid.uuid4()
#             existing_invitation.expires_at = (
#                 timezone.now() + timedelta(days=7)
#             )
#             existing_invitation.status = InvitationStatus.PENDING
#             existing_invitation.role = role
#             existing_invitation.invited_by = user

#             existing_invitation.save(
#                 update_fields=[
#                     "token",
#                     "expires_at",
#                     "status",
#                     "role",
#                     "invited_by",
#                 ]
#             )

#             recipient = None
#             if existing_invitation.email:
#                 try:
#                     recipient = UserModel.objects.get(email=existing_invitation.email)
#                 except UserModel.DoesNotExist:
#                     recipient = None

#             if recipient is not None:
#                 NotificationService.workspace_invitation_sent(
#                     actor=user,
#                     recipient=recipient,
#                     workspace=workspace,
#                     invitation=existing_invitation,
#                 )

#             InvitationService._send_invitation_email(
#                 invitation=existing_invitation,
#                 workspace=workspace,
#                 inviter=user,
#             )
#             InvitationService._log_invitation_event(
#                 workspace=workspace,
#                 actor=user,
#                 event_type=EventType.INVITATION_SENT,
#                 title="Workspace invitation sent",
#                 description=(
#                     f"{user.username} re-invited {email} to join "
#                     f"'{workspace.name}' as {role.lower()}."
#                 ),
#                 invitation=existing_invitation,
#                 recipient_email=email,
#                 role=role,
#             )

#         else:

#             invitation = Invitation.objects.create(
#                 workspace=workspace,
#                 email=email,
#                 role=role,
#                 invited_by=user,
#                 expires_at=timezone.now() + timedelta(days=7),
#             )

#             invited_user = UserModel.objects.filter(email=email).first()

#             if invited_user and invited_user != user:
#                 Notification.objects.create(
#                     actor=user,
#                     recipient=invited_user,
#                     workspace=workspace,
#                     title="Workspace Invitation",
#                     message=f"{user.username} invited you to join '{workspace.name}'.",
#                     notification_type=NotificationType.WORKSPACE_INVITATION,
#                     target_type=NotificationTargetType.INVITATION,
#                     target_id=invitation.id,
#                 )

#             InvitationService._send_invitation_email(
#                 invitation=invitation,
#                 workspace=workspace,
#                 inviter=user,
#             )
#             InvitationService._log_invitation_event(
#                 workspace=workspace,
#                 actor=user,
#                 event_type=EventType.INVITATION_SENT,
#                 title="Workspace invitation sent",
#                 description=(
#                     f"{user.username} invited {email} to join "
#                     f"'{workspace.name}' as {role.lower()}."
#                 ),
#                 invitation=invitation,
#                 recipient_email=email,
#                 role=role,
#             )

#     @staticmethod
#     def accept_invitation(user, token):

#         invitation = (
#             Invitation.objects.select_related(
#                 "workspace",
#                 "invited_by",
#             )
#             .filter(token=token)
#             .first()
#         )

#         if invitation is None:
#             raise NotFound("Invitation not found.")

#         if invitation.status != InvitationStatus.PENDING:
#             raise ValidationError(
#                 "This invitation is no longer valid."
#             )

#         if invitation.expires_at <= timezone.now():
#             raise ValidationError(
#                 "This invitation has expired."
#             )

#         if user.email != invitation.email:
#             raise PermissionDenied(
#                 "This invitation was not sent to your email."
#             )

#         already_member = WorkspaceMember.objects.filter(
#             workspace=invitation.workspace,
#             user=user,
#         ).exists()

#         if already_member:
#             raise ValidationError(
#                 "You are already a member of this workspace."
#             )

#         with transaction.atomic():

#             WorkspaceMember.objects.create(
#                 user=user,
#                 workspace=invitation.workspace,
#                 role=invitation.role,
#             )

#             invitation.status = InvitationStatus.ACCEPTED
#             invitation.save(update_fields=["status"])

#             NotificationService.workspace_invitation_accepted(
#                 actor=user,
#                 recipient=invitation.invited_by,
#                 workspace=invitation.workspace,
#                 invitation=invitation,
#             )

#             EventLog.objects.create(
#                 workspace=invitation.workspace,
#                 actor=user,
#                 event_type=EventType.INVITATION_ACCEPTED,
#                 title="Workspace invitation accepted",
#                 description=(
#                     f"{user.username} accepted the invitation to join "
#                     f"'{invitation.workspace.name}'."
#                 ),
#                 resource_type=EventResourceType.INVITATION,
#                 resource_id=invitation.id,
#                 metadata={
#                     "email": invitation.email,
#                     "role": invitation.role,
#                 },
#             )

#     @staticmethod
#     def remove_member(user, workspace_id, target_user_id):

#         workspace = Workspace.objects.filter(
#             id=workspace_id
#         ).first()

#         if workspace is None:
#             raise NotFound("Workspace not found.")

#         requesting_member = WorkspaceMember.objects.filter(
#             workspace=workspace,
#             user=user,
#         ).first()

#         if requesting_member is None:
#             raise PermissionDenied(
#                 "You don't have access to this workspace."
#             )

#         if requesting_member.role not in [
#             WorkspaceRole.OWNER,
#             WorkspaceRole.ADMIN,
#         ]:
#             raise PermissionDenied(
#                 "You don't have permission to remove members."
#             )

#         target_member = WorkspaceMember.objects.filter(
#             workspace=workspace,
#             user_id=target_user_id,
#         ).first()

#         if target_member is None:
#             raise NotFound("Member not found.")

#         if target_member.role == WorkspaceRole.OWNER:
#             raise PermissionDenied(
#                 "Cannot remove the workspace owner."
#             )

#         if target_member.user == user:
#             raise ValidationError(
#                 "You cannot remove yourself."
#             )

#         if (
#             requesting_member.role == WorkspaceRole.ADMIN
#             and target_member.role == WorkspaceRole.ADMIN
#         ):
#             raise PermissionDenied(
#                 "Admins cannot remove other admins."
#             )

#         target_member.delete()

#         NotificationService.workspace_member_removed(
#             actor=user,
#             recipient=target_member.user,
#             workspace=workspace,
#         )

#         EventLog.objects.create(
#             workspace=workspace,
#             actor=user,
#             event_type=EventType.WORKSPACE_MEMBER_REMOVED,
#             title="Workspace member removed",
#             description=(
#                 f"{user.username} removed {target_member.user.username} from "
#                 f"'{workspace.name}'."
#             ),
#             resource_type=EventResourceType.WORKSPACE,
#             resource_id=workspace.id,
#             metadata={"target_user_id": str(target_member.user_id)},
#         )

#     @staticmethod
#     def change_member_role(
#         user,
#         workspace_id,
#         target_user_id,
#         validated_data,
#     ):

#         workspace = Workspace.objects.filter(
#             id=workspace_id
#         ).first()

#         if workspace is None:
#             raise NotFound("Workspace not found.")

#         requesting_member = WorkspaceMember.objects.filter(
#             workspace=workspace,
#             user=user,
#         ).first()

#         if requesting_member is None:
#             raise PermissionDenied(
#                 "You don't have access to this workspace."
#             )

#         if requesting_member.role not in [
#             WorkspaceRole.OWNER,
#             WorkspaceRole.ADMIN,
#         ]:
#             raise PermissionDenied(
#                 "You don't have permission to change member roles."
#             )

#         target_member = WorkspaceMember.objects.filter(
#             workspace=workspace,
#             user_id=target_user_id,
#         ).first()

#         if target_member is None:
#             raise NotFound("Member not found.")

#         if target_member.role == WorkspaceRole.OWNER:
#             raise PermissionDenied(
#                 "Cannot modify the owner's role."
#             )

#         if (
#             requesting_member.role == WorkspaceRole.ADMIN
#             and target_member.role == WorkspaceRole.ADMIN
#         ):
#             raise PermissionDenied(
#                 "Admins cannot change another admin's role."
#             )

#         target_member.role = validated_data["role"]
#         target_member.save(update_fields=["role"])

#         NotificationService.workspace_member_role_changed(
#             actor=user,
#             recipient=target_member.user,
#             workspace=workspace,
#             role=target_member.role,
#         )

#         EventLog.objects.create(
#             workspace=workspace,
#             actor=user,
#             event_type=EventType.WORKSPACE_UPDATED,
#             title="Workspace member role updated",
#             description=(
#                 f"{user.username} changed {target_member.user.username}'s role "
#                 f"to {target_member.role} in '{workspace.name}'."
#             ),
#             resource_type=EventResourceType.WORKSPACE,
#             resource_id=workspace.id,
#             metadata={"target_user_id": str(target_member.user_id), "role": target_member.role},
#         )

#         return target_member




class InvitationService:

    # ============================================================
    # EMAIL
    # ============================================================

    @staticmethod
    def _send_invitation_email(
        invitation,
        workspace,
        inviter
    ):
        recipient_email = invitation.email

        if not recipient_email:
            return

        frontend_url = getattr(
            settings,
            "FRONTEND_URL",
            "http://localhost:3000"
        )

        accept_url = (
            f"{frontend_url.rstrip('/')}"
            f"/invitations/accept/{invitation.token}"
        )

        subject = (
            f"You’re invited to join {workspace.name}"
        )

        message = (
            f"{inviter.username} invited you to join "
            f"the workspace '{workspace.name}'.\n"
            f"Accept the invitation here: {accept_url}"
        )

        try:
            send_mail(
                subject=subject,
                message=message,
                from_email=getattr(
                    settings,
                    "DEFAULT_FROM_EMAIL",
                    "no-reply@example.com"
                ),
                recipient_list=[recipient_email],
                fail_silently=False,
            )

        except Exception:
            # Preserve existing behavior:
            # email failure must not break invitation creation.
            return


    # ============================================================
    # ACTIVITY LOG
    # ============================================================

    @staticmethod
    def _log_invitation_event(
        workspace,
        actor,
        event_type,
        title,
        description,
        invitation,
        recipient_email,
        role
    ):
        EventLog.objects.create(
            workspace=workspace,
            actor=actor,
            event_type=event_type,
            title=title,
            description=description,
            resource_type=EventResourceType.INVITATION,
            resource_id=invitation.id,
            metadata={
                "email": recipient_email,
                "role": role,
            },
        )


    # ============================================================
    # INVITE MEMBER
    # ============================================================

    @staticmethod
    @transaction.atomic
    def invite_member(
        user,
        workspace_id,
        validated_data
    ):

        workspace = (
            Workspace.objects
            .filter(id=workspace_id)
            .select_related(
                "setting_for_workspace"
            )
            .first()
        )

        if workspace is None:
            raise NotFound(
                "Workspace not found."
            )

        membership = (
            WorkspaceMember.objects
            .filter(
                workspace=workspace,
                user=user,
            )
            .first()
        )

        if membership is None:
            raise PermissionDenied(
                "You don't have access to this workspace."
            )

        setting = getattr(
            workspace,
            "setting_for_workspace",
            None
        )

        allow_member_invites = (
            setting.allow_member_invites
            if setting
            else False
        )

        if not allow_member_invites:

            if membership.role != WorkspaceRole.OWNER:
                raise PermissionDenied(
                    "Only workspace owner can invite members."
                )

        else:

            if membership.role not in [
                WorkspaceRole.OWNER,
                WorkspaceRole.ADMIN,
            ]:
                raise PermissionDenied(
                    "You don't have permission to invite members."
                )

        email = validated_data["email"]
        role = validated_data["role"]

        # --------------------------------------------------------
        # Existing member check
        # --------------------------------------------------------

        is_existing_member = (
            WorkspaceMember.objects
            .filter(
                workspace=workspace,
                user__email=email,
            )
            .exists()
        )

        if is_existing_member:
            raise ValidationError(
                "This user is already a member of this workspace."
            )

        # --------------------------------------------------------
        # Existing invitation
        # --------------------------------------------------------

        existing_invitation = (
            Invitation.objects
            .filter(
                workspace=workspace,
                email=email,
            )
            .first()
        )

        if existing_invitation:

            # Active invitation already exists
            if (
                existing_invitation.status
                == InvitationStatus.PENDING
                and existing_invitation.expires_at
                > timezone.now()
            ):
                raise ValidationError(
                    "An active invitation already exists "
                    "for this email."
                )

            # Reuse expired/old invitation
            existing_invitation.token = uuid.uuid4()

            existing_invitation.expires_at = (
                timezone.now()
                + timedelta(days=7)
            )

            existing_invitation.status = (
                InvitationStatus.PENDING
            )

            existing_invitation.role = role
            existing_invitation.invited_by = user

            existing_invitation.save(
                update_fields=[
                    "token",
                    "expires_at",
                    "status",
                    "role",
                    "invited_by",
                ]
            )

            recipient = (
                UserModel.objects
                .filter(
                    email=existing_invitation.email
                )
                .first()
            )

            if recipient is not None:

                NotificationService.workspace_invitation_sent(
                    actor=user,
                    recipient=recipient,
                    workspace=workspace,
                    invitation=existing_invitation,
                )

            InvitationService._send_invitation_email(
                invitation=existing_invitation,
                workspace=workspace,
                inviter=user,
            )

            InvitationService._log_invitation_event(
                workspace=workspace,
                actor=user,
                event_type=EventType.INVITATION_SENT,
                title="Workspace invitation sent",
                description=(
                    f"{user.username} re-invited {email} "
                    f"to join '{workspace.name}' "
                    f"as {role.lower()}."
                ),
                invitation=existing_invitation,
                recipient_email=email,
                role=role,
            )

            return existing_invitation

        # --------------------------------------------------------
        # Create new invitation
        # --------------------------------------------------------

        invitation = Invitation.objects.create(
            workspace=workspace,
            email=email,
            role=role,
            invited_by=user,
            expires_at=(
                timezone.now()
                + timedelta(days=7)
            ),
        )

        invited_user = (
            UserModel.objects
            .filter(email=email)
            .first()
        )

        if invited_user and invited_user != user:

            NotificationService.workspace_invitation_sent(
                actor=user,
                recipient=invited_user,
                workspace=workspace,
                invitation=invitation,
            )

        InvitationService._send_invitation_email(
            invitation=invitation,
            workspace=workspace,
            inviter=user,
        )

        InvitationService._log_invitation_event(
            workspace=workspace,
            actor=user,
            event_type=EventType.INVITATION_SENT,
            title="Workspace invitation sent",
            description=(
                f"{user.username} invited {email} "
                f"to join '{workspace.name}' "
                f"as {role.lower()}."
            ),
            invitation=invitation,
            recipient_email=email,
            role=role,
        )

        return invitation


    # ============================================================
    # ACCEPT INVITATION
    # ============================================================

    @staticmethod
    @transaction.atomic
    def accept_invitation(
        user,
        token
    ):

        invitation = (
            Invitation.objects
            .select_related(
                "workspace",
                "invited_by",
            )
            .filter(token=token)
            .first()
        )

        if invitation is None:
            raise NotFound(
                "Invitation not found."
            )

        if invitation.status != InvitationStatus.PENDING:
            raise ValidationError(
                "This invitation is no longer valid."
            )

        if invitation.expires_at <= timezone.now():
            raise ValidationError(
                "This invitation has expired."
            )

        if user.email != invitation.email:
            raise PermissionDenied(
                "This invitation was not sent to your email."
            )

        already_member = (
            WorkspaceMember.objects
            .filter(
                workspace=invitation.workspace,
                user=user,
            )
            .exists()
        )

        if already_member:
            raise ValidationError(
                "You are already a member of this workspace."
            )

        WorkspaceMember.objects.create(
            user=user,
            workspace=invitation.workspace,
            role=invitation.role,
        )

        invitation.status = (
            InvitationStatus.ACCEPTED
        )

        invitation.save(
            update_fields=["status"]
        )

        NotificationService.workspace_invitation_accepted(
            actor=user,
            recipient=invitation.invited_by,
            workspace=invitation.workspace,
            invitation=invitation,
        )

        EventLog.objects.create(
            workspace=invitation.workspace,
            actor=user,
            event_type=EventType.INVITATION_ACCEPTED,
            title="Workspace invitation accepted",
            description=(
                f"{user.username} accepted the invitation "
                f"to join '{invitation.workspace.name}'."
            ),
            resource_type=EventResourceType.INVITATION,
            resource_id=invitation.id,
            metadata={
                "email": invitation.email,
                "role": invitation.role,
            },
        )


    # ============================================================
    # REMOVE MEMBER
    # ============================================================

    @staticmethod
    @transaction.atomic
    def remove_member(
        user,
        workspace_id,
        target_user_id
    ):

        workspace = (
            Workspace.objects
            .filter(id=workspace_id)
            .first()
        )

        if workspace is None:
            raise NotFound(
                "Workspace not found."
            )

        requesting_member = (
            WorkspaceMember.objects
            .filter(
                workspace=workspace,
                user=user,
            )
            .first()
        )

        if requesting_member is None:
            raise PermissionDenied(
                "You don't have access to this workspace."
            )

        if requesting_member.role not in [
            WorkspaceRole.OWNER,
            WorkspaceRole.ADMIN,
        ]:
            raise PermissionDenied(
                "You don't have permission to remove members."
            )

        target_member = (
            WorkspaceMember.objects
            .select_related("user")
            .filter(
                workspace=workspace,
                user_id=target_user_id,
            )
            .first()
        )

        if target_member is None:
            raise NotFound(
                "Member not found."
            )

        if target_member.role == WorkspaceRole.OWNER:
            raise PermissionDenied(
                "Cannot remove the workspace owner."
            )

        if target_member.user == user:
            raise ValidationError(
                "You cannot remove yourself."
            )

        if (
            requesting_member.role
            == WorkspaceRole.ADMIN
            and target_member.role
            == WorkspaceRole.ADMIN
        ):
            raise PermissionDenied(
                "Admins cannot remove other admins."
            )

        target_user = target_member.user

        target_member.delete()

        NotificationService.workspace_member_removed(
            actor=user,
            recipient=target_user,
            workspace=workspace,
        )

        EventLog.objects.create(
            workspace=workspace,
            actor=user,
            event_type=EventType.WORKSPACE_MEMBER_REMOVED,
            title="Workspace member removed",
            description=(
                f"{user.username} removed "
                f"{target_user.username} from "
                f"'{workspace.name}'."
            ),
            resource_type=EventResourceType.WORKSPACE,
            resource_id=workspace.id,
            metadata={
                "target_user_id": str(target_user.id)
            },
        )


    # ============================================================
    # CHANGE MEMBER ROLE
    # ============================================================

    @staticmethod
    @transaction.atomic
    def change_member_role(
        user,
        workspace_id,
        target_user_id,
        validated_data
    ):

        workspace = (
            Workspace.objects
            .filter(id=workspace_id)
            .first()
        )

        if workspace is None:
            raise NotFound(
                "Workspace not found."
            )

        requesting_member = (
            WorkspaceMember.objects
            .filter(
                workspace=workspace,
                user=user,
            )
            .first()
        )

        if requesting_member is None:
            raise PermissionDenied(
                "You don't have access to this workspace."
            )

        if requesting_member.role not in [
            WorkspaceRole.OWNER,
            WorkspaceRole.ADMIN,
        ]:
            raise PermissionDenied(
                "You don't have permission "
                "to change member roles."
            )

        target_member = (
            WorkspaceMember.objects
            .select_related("user")
            .filter(
                workspace=workspace,
                user_id=target_user_id,
            )
            .first()
        )

        if target_member is None:
            raise NotFound(
                "Member not found."
            )

        if target_member.role == WorkspaceRole.OWNER:
            raise PermissionDenied(
                "Cannot modify the owner's role."
            )

        if (
            requesting_member.role
            == WorkspaceRole.ADMIN
            and target_member.role
            == WorkspaceRole.ADMIN
        ):
            raise PermissionDenied(
                "Admins cannot change another admin's role."
            )

        target_member.role = validated_data["role"]

        target_member.save(
            update_fields=["role"]
        )

        NotificationService.workspace_member_role_changed(
            actor=user,
            recipient=target_member.user,
            workspace=workspace,
            role=target_member.role,
        )

        EventLog.objects.create(
            workspace=workspace,
            actor=user,
            event_type=EventType.WORKSPACE_UPDATED,
            title="Workspace member role updated",
            description=(
                f"{user.username} changed "
                f"{target_member.user.username}'s role "
                f"to {target_member.role} in "
                f"'{workspace.name}'."
            ),
            resource_type=EventResourceType.WORKSPACE,
            resource_id=workspace.id,
            metadata={
                "target_user_id": str(
                    target_member.user_id
                ),
                "role": target_member.role,
            },
        )

        return target_member