from django.db import models
from common.utils.models import UUIDModel, TimeStampedModel 

# Create your models here.
class ThemeChoices(models.TextChoices):
    LIGHT = "LIGHT", "Light"
    DARK = "DARK", "Dark"
    SYSTEM = "SYSTEM", "System"


class LanguageChoices(models.TextChoices):
    ENGLISH = "en", "English"


class UserModel(UUIDModel, TimeStampedModel):
    # core identity fields
    # id = UUIDModel.id django will automatically add the id field from the inherted model
    email = models.EmailField(unique=True, max_length=255) 
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    username = models.CharField(max_length=255, unique=True)
    
    # authentication fields
    password = models.CharField(max_length=64)
    is_email_verified = models.BooleanField(default=False)
    last_login = models.DateTimeField(null=True, blank=True)

    # status fields
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)

    # profile fields
    # avatar_file_id = models.UUIDField(null=True, blank=True)
    bio = models.TextField(null=True, blank=True)


    # updated_at = TimeStampedModel.updated_at same reason as id
    # created_at = TimeStampedModel.created_at same reason as id

    def __str__(self):
        return self.username



class UserSettingsModel(UUIDModel, TimeStampedModel):
    user = models.OneToOneField(UserModel, on_delete=models.CASCADE, related_name='settings')
    theme = models.CharField(max_length=20, choices=ThemeChoices.choices, default=ThemeChoices.SYSTEM)
    timezone = models.CharField(max_length=50, default="UTC")
    language = models.CharField(max_length=20, choices=LanguageChoices.choices, default=LanguageChoices.ENGLISH)
    task_notifications = models.BooleanField(default=True)
    mention_notifications = models.BooleanField(default=True)
    dm_notifications = models.BooleanField(default=True)

    def __str__(self):
        return f"Settings for {self.user.username}"
    


class SessionsModel(UUIDModel):
    user = models.ForeignKey(UserModel, on_delete=models.CASCADE, related_name='sessions')
    refresh_token = models.TextField()
    ip_address = models.GenericIPAddressField()
    user_agent = models.TextField()
    expires_at = models.DateTimeField()
    revoked_at = models.DateTimeField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"sessions for {self.user.username}"



class PasswordResetTokenModel(UUIDModel):
    user = models.ForeignKey(UserModel, on_delete=models.CASCADE, related_name='password_reset_tokens')
    token = models.CharField(max_length=64, unique=True)
    expires_at = models.DateTimeField()
    used_at = models.DateTimeField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"password reset token for {self.user.username}"
    

class EmailVerificationTokenModel(UUIDModel):
    user = models.ForeignKey(UserModel, on_delete=models.CASCADE, related_name='email_verification_tokens')
    token = models.CharField(max_length=64, unique=True)
    expires_at = models.DateTimeField()
    verified_at = models.DateTimeField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"email verification token for {self.user.username}"
    



