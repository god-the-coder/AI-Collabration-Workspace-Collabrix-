from apps.notifications.models import Notification


class NotifiationService:

    @staticmethod
    def get_all_notification(user):
        return (
            Notification.objects.filter(
                recipient=user,
            ).select_related(
                "actor",
                "workspace"
            ).order_by("-created_at")
        )
    
    @staticmethod
    def get_unread_count(user):
        return (
            Notification.objects.filter(
                recipient=user,
            ).count()
        )