from rest_framework import serializers
from apps.notifications.models import Notification


class NotificationSerializer(serializers.ModelSerializer):

    workspace_id = serializers.UUIDField(
        source="workspace.id"
    )

    actor = serializers.CharField(
        source="actor.username"
    )

    class Meta:
        model = Notification
        fields = [
            "id",
            "actor",
            "title",
            "message",
            "priority",
            "notification_type",
            "is_read",
            "created_at",
            "target_type",
            "target_id",
            "workspace_id"
        ]