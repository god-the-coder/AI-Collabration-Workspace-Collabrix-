from django.db import models
from common.utils.models import UUIDModel, TimeStampedModel 
from django.contrib.auth.models import AbstractUser
# from apps.files.models import File

# Create your models here.
class ThemeChoices(models.TextChoices):
    LIGHT = "LIGHT", "Light"
    DARK = "DARK", "Dark"
    SYSTEM = "SYSTEM", "System"


class LanguageChoices(models.TextChoices):
    ENGLISH = "en", "English"


class UserModel(UUIDModel, TimeStampedModel, AbstractUser):
    email = models.EmailField(unique=True)

    is_email_verified = models.BooleanField(default=False)
    bio = models.TextField(blank=True, null=True)

    avatar = models.ForeignKey(
        'files.File',
        on_delete=models.SET_NULL,
        blank=True,
        null=True,
        related_name="user_avatar"    
    )

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
    last_active_at = models.DateTimeField(
        auto_now=True
    )

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
    



