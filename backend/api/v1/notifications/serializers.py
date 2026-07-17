from rest_framework import serializers

from apps.notifications.models import Notification
from apps.accounts.models import UserModel


class ProfileSerializer(serializers.ModelSerializer):
    avatar = serializers.SerializerMethodField()

    class Meta:
        model = UserModel
        fields = [
            "id",
            "first_name",
            "last_name",
            "avatar",
        ]

    def get_avatar(self, obj):
        if obj.avatar:
            return obj.avatar.file_url
        return None
    


class NotificationSerializer(serializers.ModelSerializer):
    actor = ProfileSerializer(read_only=True)

    class Meta:
        model = Notification
        fields = [
            "id",
            "actor",
            "title",
            "message",
            "notification_type",
            "priority",
            "is_read",
            "created_at",
            "target_type",
            "target_id",
        ]


class NotificationListSerializer(serializers.Serializer):
    unread_count = serializers.IntegerField()
    notifications = NotificationSerializer(many=True)