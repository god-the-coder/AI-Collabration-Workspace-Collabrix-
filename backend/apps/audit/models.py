from django.db import models
from django.db.models import CASCADE, SET_NULL
from apps.accounts.models import UserModel
from apps.workspaces.models import Workspace
from common.utils.models import UUIDModel


class EventType(models.TextChoices):
    WORKSPACE_CREATED = "WORKSPACE_CREATED", "Workspace Created"
    WORKSPACE_UPDATED = "WORKSPACE_UPDATED", "Workspace Updated"
    WORKSPACE_MEMBER_ADDED = "WORKSPACE_MEMBER_ADDED", "Workspace Member Added"
    WORKSPACE_MEMBER_REMOVED = "WORKSPACE_MEMBER_REMOVED", "Workspace Member Removed"
    OWNERSHIP_TRANSFERRED = "OWNERSHIP_TRANSFERRED", "Ownership Transferred"

    PROJECT_CREATED = "PROJECT_CREATED", "Project Created"
    PROJECT_UPDATED = "PROJECT_UPDATED", "Project Updated"
    PROJECT_ARCHIVED = "PROJECT_ARCHIVED", "Project Archived"

    TASK_CREATED = "TASK_CREATED", "Task Created"
    TASK_ASSIGNED = "TASK_ASSIGNED", "Task Assigned"
    TASK_COMPLETED = "TASK_COMPLETED", "Task Completed"
    TASK_STATUS_CHANGED = "TASK_STATUS_CHANGED", "Task Status Changed"

    COMMENT_ADDED = "COMMENT_ADDED", "Comment Added"

    FILE_UPLOADED = "FILE_UPLOADED", "File Uploaded"

    INVITATION_SENT = "INVITATION_SENT", "Invitation Sent"
    INVITATION_ACCEPTED = "INVITATION_ACCEPTED", "Invitation Accepted"


class EventResourceType(models.TextChoices):
    WORKSPACE = "WORKSPACE", "Workspace"
    PROJECT = "PROJECT", "Project"
    TASK = "TASK", "Task"
    COMMENT = "COMMENT", "Comment"
    FILE = "FILE", "File"
    INVITATION = "INVITATION", "Invitation"


class EventLog(UUIDModel):
    workspace = models.ForeignKey(
        Workspace,
        on_delete=CASCADE,
        related_name="event_logs",
    )

    actor = models.ForeignKey(
        UserModel,
        on_delete=SET_NULL,
        related_name="event_logs",
        null=True,
        blank=True,
    )

    event_type = models.CharField(
        max_length=50,
        choices=EventType.choices,
    )

    title = models.CharField(
        max_length=100,
    )

    description = models.TextField()

    resource_type = models.CharField(
        max_length=20,
        choices=EventResourceType.choices,
    )

    resource_id = models.UUIDField()

    metadata = models.JSONField(
        default=dict,
        blank=True,
    )

    created_at = models.DateTimeField(
        auto_now_add=True,
    )

    class Meta:
        indexes = [
            models.Index(fields=["workspace"]),
            models.Index(fields=["actor"]),
            models.Index(fields=["event_type"]),
            models.Index(fields=["resource_type", "resource_id"]),
            models.Index(fields=["created_at"]),
        ]

    def __str__(self):
        return f"{self.event_type} -> ({self.title})"