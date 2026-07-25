from apps.notifications.models import Notification, NotificationType, NotificationTargetType


class NotificationService:

    @staticmethod
    def get_notifications(user):
        notifications = (
            Notification.objects
            .filter(recipient=user)
            .select_related("actor")
            [:30]
        )

        unread_count = Notification.objects.filter(
            recipient=user,
            is_read=False
        ).count()

        return {
            "unread_count": unread_count,
            "notifications": notifications,
        }
    

    @staticmethod
    def project_created(actor, workspace, project):

        recipients = (
            workspace.members
            .exclude(user=actor)
            .select_related("user")
        )

        notifications = []

        for member in recipients:
            notifications.append(
                Notification(
                    actor=actor,
                    recipient=member.user,
                    workspace=workspace,
                    title="New Project Created",
                    message=f"{actor.username} created '{project.name}'.",
                    notification_type=NotificationType.PROJECT_CREATED,
                    target_type=NotificationTargetType.PROJECT,
                    target_id=project.id,
                )
            )

        Notification.objects.bulk_create(notifications)



    @staticmethod
    def task_assigned(actor, recipient, workspace, task):

        if actor == recipient:
            return

        Notification.objects.create(
            actor=actor,
            recipient=recipient,
            workspace=workspace,
            title="Task Assigned",
            message=f"{actor.username} assigned you '{task.title}'.",
            notification_type=NotificationType.TASK_ASSIGNED,
            target_type=NotificationTargetType.TASK,
            target_id=task.id,
        )

    @staticmethod
    def workspace_invitation_sent(actor, recipient, workspace, invitation):
        if actor == recipient:
            return

        Notification.objects.create(
            actor=actor,
            recipient=recipient,
            workspace=workspace,
            title="Workspace Invitation",
            message=f"{actor.username} invited you to join '{workspace.name}'.",
            notification_type=NotificationType.WORKSPACE_INVITATION,
            target_type=NotificationTargetType.INVITATION,
            target_id=invitation.id,
        )

    @staticmethod
    def workspace_invitation_accepted(actor, recipient, workspace, invitation):
        if actor == recipient:
            return

        Notification.objects.create(
            actor=actor,
            recipient=recipient,
            workspace=workspace,
            title="Invitation Accepted",
            message=f"{actor.username} accepted your invitation to join '{workspace.name}'.",
            notification_type=NotificationType.WORKSPACE_INVITATION,
            target_type=NotificationTargetType.INVITATION,
            target_id=invitation.id,
        )

    @staticmethod
    def workspace_member_removed(actor, recipient, workspace):
        if actor == recipient:
            return

        Notification.objects.create(
            actor=actor,
            recipient=recipient,
            workspace=workspace,
            title="Removed from Workspace",
            message=f"{actor.username} removed you from '{workspace.name}'.",
            notification_type=NotificationType.WORKSPACE_INVITATION,
            target_type=None,
            target_id=None,
        )

    @staticmethod
    def workspace_member_role_changed(actor, recipient, workspace, role):
        if actor == recipient:
            return

        Notification.objects.create(
            actor=actor,
            recipient=recipient,
            workspace=workspace,
            title="Workspace Role Updated",
            message=f"{actor.username} updated your role to {role.lower()} in '{workspace.name}'.",
            notification_type=NotificationType.WORKSPACE_INVITATION,
            target_type=None,
            target_id=None,
        )