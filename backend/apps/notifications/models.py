from django.db import models
from django.db.models import CASCADE

from common.utils.models import UUIDModel
from apps.accounts.models import UserModel
from apps.workspaces.models import Workspace


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

    PROJECT_ADDED = "PROJECT_ADDED", "Project Added"
    PROJECT_INVITATION = "PROJECT_INVITATION", "Project Invitation"

    WORKSPACE_INVITATION = "WORKSPACE_INVITATION", "Workspace Invitation"

    MENTION = "MENTION", "Mention"

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
        null=True,
        blank=True,
    )

    recipient = models.ForeignKey(
        UserModel,
        on_delete=CASCADE,
        related_name="notification_recived",
        db_index=True,
    )

    workspace = models.ForeignKey(
        Workspace,
        on_delete=CASCADE,
        related_name="notifications",
        null=True,
        blank=True,
    )

    title = models.CharField(
        max_length=120,
    )

    message = models.TextField()

    notification_type = models.CharField(
        max_length=30,
        choices=NotificationType.choices,
        db_index=True,
    )

    priority = models.CharField(
        max_length=20,
        choices=NotificationPriority.choices,
        default=NotificationPriority.NORMAL,
    )

    is_read = models.BooleanField(
        default=False,
        db_index=True,
    )

    read_at = models.DateTimeField(
        null=True,
        blank=True,
    )

    target_type = models.CharField(
        max_length=20,
        choices=NotificationTargetType.choices,
        null=True,
        blank=True,
    )

    target_id = models.UUIDField(
        null=True,
        blank=True,
    )

    created_at = models.DateTimeField(
        auto_now_add=True,
        db_index=True,
    )

    class Meta:
        ordering = ["-created_at"]
        indexes = [
            models.Index(fields=["recipient", "is_read"]),
            models.Index(fields=["recipient", "-created_at"]),
        ]

    def __str__(self):
        return f"{self.recipient.username} - {self.title}"