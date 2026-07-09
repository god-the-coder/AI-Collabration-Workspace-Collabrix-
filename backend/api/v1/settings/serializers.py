from rest_framework import serializers
from apps.accounts.models import UserModel, UserSettingsModel, SessionsModel, ThemeChoices
from user_agents import parse
from django.contrib.auth.password_validation import validate_password


class ProfileSerializer(serializers.ModelSerializer):

    avatar = serializers.SerializerMethodField()
    initials = serializers.SerializerMethodField()

    class Meta:
        model=UserModel
        fields=[
            'id',
            'username',
            'email',
            'bio',
            'avatar',
            'initials',
            'date_joined',
            'is_email_verified'
        ]

    
    def get_avatar(self, obj):
        if obj.avatar:
            return obj.avatar.file.url
        return None
    
    def get_initials(self, obj):
        first = obj.first_name[:1].upper() if obj.first_name else ""
        last = obj.last_name[:1].upper() if obj.last_name else ""

        return f"{first}{last}"
    

class AppearanceSerializer(serializers.ModelSerializer):
    class Meta:
        model=UserSettingsModel
        fields=['theme']


class NotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model=UserSettingsModel
        fields=[
            'task_notifications',
            'mention_notifications',
            'dm_notifications'
        ]



class SessionSerializer(serializers.ModelSerializer):
    device_name = serializers.SerializerMethodField()
    browser = serializers.SerializerMethodField()
    current_device = serializers.SerializerMethodField()
    last_active_at = serializers.DateTimeField(source="created_at")

    class Meta:
        model = SessionsModel
        fields = [
            "id",
            "device_name",
            "browser",
            "current_device",
            "last_active_at",
        ]

    def get_device_name(self, obj):
        ua = parse(obj.user_agent)

        if ua.is_mobile:
            return ua.os.family

        if ua.is_tablet:
            return f"{ua.os.family} Tablet"

        if ua.is_pc:
            return ua.os.family

        return "Unknown Device"

    def get_browser(self, obj):
        ua = parse(obj.user_agent)
        return ua.browser.family

    def get_current_device(self, obj):
        current_session_id = self.context.get("current_session_id")

        return (
            current_session_id is not None
            and str(obj.id) == str(current_session_id)
        )
        


class UpdateProfileSerializer(serializers.Serializer):
    
    first_name = serializers.CharField(
        required=False,
        max_length=255
    )
    last_name = serializers.CharField(required=False, max_length=255)
    username = serializers.CharField(required=False, max_length=255)
    avatar = serializers.FileField(required=False)
    bio = serializers.CharField(
        required=False,
        allow_blank=True
    )


    def validate_username(self, value):
        user = self.context["request"].user

        if UserModel.objects.filter(
            username=value
        ).exclude(
            pk=user.pk
        ).exists():
            raise serializers.ValidationError(
                "This username is already taken"
            )
        
        return value



class UpdateProfileResponseSerializer(serializers.ModelSerializer):

    avatar = serializers.SerializerMethodField()
    initials = serializers.SerializerMethodField()

    class Meta:
        model=UserModel
        fields=[
            "id",
            "username",
            "first_name",
            "last_name",
            "email",
            "bio",
            "avatar",
            "initials"
        ]


    def get_avatar(self, obj):
        if obj.avatar:
            return obj.avatar.file.url
        return None
    
    def get_initials(self, obj):
        first = obj.first_name[:1].upper() if obj.first_name else ""
        last = obj.last_name[:1].upper() if obj.last_name else ""

        return f"{first}{last}"



class UpdateAppearanceSerializer(serializers.Serializer):

    theme = serializers.CharField(
        max_length=10
    )

    def validate_theme(self, value):
        if value not in ThemeChoices.values:
            raise serializers.ValidationError(
                "Choose a valid theme"
            )
        
        return value


class UpdateAppearanceResponseSerializer(serializers.ModelSerializer):

    class Meta:
        model=UserSettingsModel
        fields=['theme']


class UpdateNotificationSerializer(serializers.Serializer):
    
    task_notifications = serializers.BooleanField(required=False)
    mention_notifications = serializers.BooleanField(required=False)
    dm_notifications = serializers.BooleanField(required=False)


class UpdateNotificationResponseSerializer(serializers.ModelSerializer):

    class Meta:
        model=UserSettingsModel
        fields=[
            'task_notifications',
            'mention_notifications',
            'dm_notifications',
        ]


class UpdatePasswordSerializer(serializers.Serializer):
    current_password=serializers.CharField(
        min_length=8,
        write_only=True,
        trim_whitespace=True
    )
    new_password=serializers.CharField(
        min_length=8,
        write_only=True,
        trim_whitespace=True
    )
    confirm_password=serializers.CharField(
        write_only=True,
        trim_whitespace=True
    )

    def validate_new_password(self, value):
        validate_password(value)
        return value
    
    def validate(self, attrs):

        if attrs["new_password"] != attrs["confirm_password"]:
            raise serializers.ValidationError({
                "confirm_password": "password do not match"
            })
        
        return attrs


class UpdatePasswordSerializerResponse(serializers.ModelSerializer):
    class Meta:
        model=UserModel
        fields=[
            "id",
            "username"
        ]


class DeleteSerializer(serializers.Serializer):

    password = serializers.CharField(
        min_length=8,
        write_only=True,
        trim_whitespace=True
    )
