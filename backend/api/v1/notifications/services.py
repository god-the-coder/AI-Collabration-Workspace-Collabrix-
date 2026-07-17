from apps.notifications.models import Notification


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