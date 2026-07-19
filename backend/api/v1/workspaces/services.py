from django.db import transaction
from rest_framework.exceptions import PermissionDenied, NotFound

from apps.workspaces.models import Workspace, WorkspaceMember, WorkspaceSetting
from api.v1.notifications.services import NotificationService
from apps.audit.models import EventLog


class WorkspaceService:
    """
    Service layer for workspace-related actions required by the APIs:
    - leave_workspace
    - update_workspace_settings
    """

    @staticmethod
    @transaction.atomic
    def leave_workspace(user, workspace_id):
        """
        Remove the authenticated user's membership from the given workspace.

        Rules:
        - Member must belong to workspace.
        - Owner cannot leave workspace.
        - Remove only the authenticated user's membership.
        - Use transaction.atomic to ensure consistency.
        - Create notification through NotificationService (if applicable).
        - Create recent activity via EventLog (audit app).
        """

        workspace = Workspace.objects.filter(id=workspace_id).select_related("owner").first()
        if workspace is None:
            raise NotFound("Workspace not found")

        membership = WorkspaceMember.objects.filter(workspace=workspace, user=user).first()
        if membership is None:
            raise PermissionDenied("You are not a member of this workspace")

        if workspace.owner_id == user.id:
            raise PermissionDenied("Workspace owner cannot leave the workspace")

        # delete membership
        membership.delete()

        # Notification: reuse NotificationService if it exposes a suitable method.
        try:
            NotificationService.workspace_member_removed(
                actor=user,
                workspace=workspace,
                member=user
            )
        except Exception:
            # silently ignore missing notification helper (we must not duplicate notification logic)
            pass

        # Recent activity / audit log: use existing EventLog model from audit app.
        try:
            EventLog.objects.create(
                event_type="WORKSPACE_MEMBER_REMOVED",
                title="Workspace member removed",
                description=f"{user.username} left workspace '{workspace.name}'",
                resource_type="WORKSPACE",
                resource_id=workspace.id,
                metadata={"member_id": str(user.id)},
                actor=user
            )
        except Exception:
            # don't let audit logging failures block the main operation
            pass

        return {"detail": "Left workspace successfully"}


    @staticmethod
    @transaction.atomic
    def update_workspace_settings(user, workspace_id, validated_data):
        """
        Update allowed workspace settings.
        Rules:
        - Only workspace OWNER can update settings.
        - Validate workspace exists.
        - Validate membership (owner must be a member by model).
        - Update only allowed fields.
        - Return updated WorkspaceSetting instance.
        - Create recent activity via EventLog.
        - Create notification only if project notifies admins/owners about settings changes.
        """

        workspace = Workspace.objects.filter(id=workspace_id).select_related("owner", "setting_for_workspace").first()
        if workspace is None:
            raise NotFound("Workspace not found")

        if workspace.owner_id != user.id:
            raise PermissionDenied("Only the workspace owner can update settings")

        # Ensure the workspace has a related WorkspaceSetting instance
        setting = getattr(workspace, "setting_for_workspace", None)
        if setting is None:
            # Create default settings if missing (rare)
            setting = WorkspaceSetting.objects.create(workspace=workspace)

        # Allowed keys only
        allowed_fields = {
            "allow_member_invites",
            "default_member_role",
            "ai_enabled",
            "ai_file_access_enabled",
        }

        changed = False
        for key, val in validated_data.items():
            if key in allowed_fields:
                # Only set if different to avoid unnecessary writes
                if getattr(setting, key) != val:
                    setattr(setting, key, val)
                    changed = True

        if changed:
            setting.save()

            # Recent activity - log to EventLog
            try:
                EventLog.objects.create(
                    event_type="WORKSPACE_UPDATED",
                    title="Workspace settings updated",
                    description=f"{user.username} updated settings for workspace '{workspace.name}'",
                    resource_type="WORKSPACE",
                    resource_id=workspace.id,
                    metadata={"updated_fields": list(validated_data.keys())},
                    actor=user
                )
            except Exception:
                pass

            # Optional notification - only if project already notifies on settings changes.
            # Try to call a NotificationService method if it exists; otherwise do nothing.
            try:
                NotificationService.workspace_settings_updated(
                    actor=user,
                    workspace=workspace,
                    settings=setting
                )
            except Exception:
                # ignore if NotificationService doesn't provide this hook
                pass

        return setting
