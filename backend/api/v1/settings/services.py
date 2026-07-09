from apps.accounts.models import UserModel, UserSettingsModel, SessionsModel
from apps.files.models import File, FileType
from django.contrib.auth.hashers import check_password
# from django.contrib.auth.models import set_password
from rest_framework.exceptions import ValidationError, AuthenticationFailed
from django.utils import timezone
from django.db import transaction


class SettingServices:

    @staticmethod
    def get_settings_data(user):
        return {
            "profile": SettingServices.get_profile(user),
            "appearance": SettingServices.get_appearance_and_notifications(user),
            "notifications": SettingServices.get_appearance_and_notifications(user),
            "security": SettingServices.get_security(user),
            "active_sessions": SettingServices.get_active_sessions(user),
        }

    
    @staticmethod
    def get_profile(user):
        return UserModel.objects.select_related(
            "avatar"
        ).get(
            id=user.id
        )
    
    @staticmethod
    def get_appearance_and_notifications(user):
        return UserSettingsModel.objects.get(
            user=user
        )
    
    @staticmethod
    def get_security(user):
        return {
                "connected_accounts": [
                        {
                            "provider": "GOOGLE",
                            "connected": False
                        },
                        {
                            "provider": "GITHUB",
                            "connected": False
                        }
                ]
        }
    

    @staticmethod
    def get_active_sessions(user):
        return SessionsModel.objects.filter(
            user=user,
            revoked_at__isnull=True
        ).order_by("-last_active_at")
    
    # @staticmethod
    # def get_current_device(self, obj):
    #     current_session = self.context.get("current_session")

    #     if not current_session:
    #       return False

    #     return obj.id == current_session.id
    

class SettingPatchServices:

    @staticmethod
    def patch_user_profile(
        request, validated_data):
        user = request.user

        avatar_file = validated_data.pop("avatar", None)

        if avatar_file:
            file = File.objects.create(
                workspace=None,
                uploaded_by=user,
                original_name=avatar_file.name,
                file=avatar_file,
                mime_type=avatar_file.content_type,
                file_type=FileType.IMAGE,
                extention=avatar_file.name.split(".")[-1],
                file_size=avatar_file.size
            )

            user.avatar = file

        
        for field, value, in validated_data.items():
            setattr(user, field, value)

        user.save()

        return user

    @staticmethod
    def patch_apprearance(request, validated_data):

        user = request.user

        UserSettingsModel.objects.filter(
            user=user
        ).update(
            theme=validated_data["theme"]
        )


        return UserSettingsModel.objects.get(
            user=user
        )


    @staticmethod
    def patch_notification(user, validated_data):

        settings = UserSettingsModel.objects.get(
            user=user
        )

        for field, value in validated_data.items():
            setattr(settings, field, value)

        settings.save()
        return settings
    

    @staticmethod
    def patch_password(request, validated_data):

        if not check_password(validated_data["current_password"], request.user.password):
            raise ValidationError({
                "current_password": "password is incorrect"
            })
        
        user = request.user

        user.set_password(validated_data["new_password"])
        user.save()

        return user
    

    @staticmethod
    def delete_account(user, validated_data):

        if not check_password(validated_data["password"], user.password):
            raise AuthenticationFailed({
                "password": "password is incorrect"
            })
        
        user.is_active = False
        user.save(update_fields=["is_active"])

        SessionsModel.objects.filter(
            user=user,
            revoked_at__isnull=True
        ).update(
            revoked_at=timezone.now()
        )

    
    @staticmethod
    @transaction.atomic
    def revoke_all_sessions(user):

        SessionsModel.objects.filter(
            user=user,
            revoked_at__isnull=True
        ).update(
            revoked_at=timezone.now()
        )


    @staticmethod
    def revoke_sessions(user, session_id):

        SessionsModel.objects.filter(
            user=user,
            id=session_id,
            revoked_at__isnull=True
        ).update(
            revoked_at=timezone.now()
        )



    


