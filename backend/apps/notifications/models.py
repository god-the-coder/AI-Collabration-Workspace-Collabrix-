from django.db import models
from django.db.models import CASCADE
from common.utils.models import TimeStampedModel, UUIDModel
from apps.accounts.models import UserModel
from apps.workspaces.models import Workspace
# Create your models here.

class NotificationPriority(models.TextChoices):
    LOW = "LOW", "Low"
    NORMAL = "NORMAL", "Normal"
    HIGH = "HIGH", "High"
    CRITICAL = "CRITICAL", "Critical"



class NotificationType(models.TextChoices):
    TASK_ASSIGNED = "TASK_ASSIGNED", "Task Assigned"
    TASK_COMMENT = "TASK_COMMENT", "Task Comment"
    TASK_DUE = "TASK_DUE", "Task Due"
    TASK_OVERDUE = "TASK_OVERDUE", "Task Overdue"

    PROJECT_INVITATION = "PROJECT_INVITATION", "Project Invitation"
    WORKSPACE_INVITATION = "WORKSPACE_INVITATION", "Workspace Invitation"

    MENTION = "MENTION", "Mention"

    PROJECT_ADDED = "PROJECT_ADDED", "Project Added"

    OWNERSHIP_TRANSFER = "OWNERSHIP_TRANSFER", "Ownership Transfer"



class NotificationTargetType(models.TextChoices):
    TASK = "TASK", "Task"
    PROJECT = "PROJECT", "Project"
    MESSAGE = "MESSAGE", "Message"
    INVITATION = "INVITATION", "Invitation"



class Notification(UUIDModel):
    actor = models.ForeignKey(
        UserModel,
        on_delete=CASCADE,
        related_name="notifications",
        null=True, blank=True
    )

    recipient = models.ForeignKey(
        UserModel,
        on_delete=CASCADE,
        related_name="notification_recived"
    )

    workspace = models.ForeignKey(
        Workspace,
        on_delete=CASCADE,
        related_name="notifications"
    )

    title = models.CharField(
        max_length=64
    )

    message = models.TextField()

    notification_type = models.CharField(
        max_length=20,
        choices=NotificationType.choices
    )

    priority = models.CharField(
        max_length=20,
        choices=NotificationPriority.choices,
        default=NotificationPriority.NORMAL
    )

    is_read = models.BooleanField(default=False)

    read_at = models.DateTimeField(null=True, blank=True)

    target_type = models.CharField(
        max_length=20,
        choices=NotificationTargetType.choices
    )

    target_id = models.UUIDField()

    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        indexes = [
            models.Index(fields=["recipient", "is_read"]),
        ]

    def __str__(self):
      return f"{self.recipient.username} - {self.title}"
