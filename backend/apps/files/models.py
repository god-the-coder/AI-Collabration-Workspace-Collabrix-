from django.db import models
from django.db.models import CASCADE
from common.utils.models import UUIDModel, TimeStampedModel
from apps.accounts.models import UserModel
# from apps.workspaces.models import Workspace

# Create your models here.
class FileType(models.TextChoices):
    IMAGE = "IMAGE", "Image"
    DOCUMENT = "DOCUMENT", "Document"
    VIDEO = "VIDEO", "Video"
    AUDIO = "AUDIO", "Audio"
    ARCHIVE = "ARCHIVE", "Archive"
    OTHER = "OTHER", "Other"


class AttachmentResourceType(models.TextChoices):
    MESSAGE = "MESSAGE", "Message"
    TASK = "TASK", "Task"
    TASK_COMMENT = "TASK_COMMENT", "Task Comment"



class File(UUIDModel, TimeStampedModel):
    workspace = models.ForeignKey(
        "workspaces.Workspace",
        on_delete=CASCADE,
        related_name="files",
        null=True,
        blank=True
    )

    uploaded_by = models.ForeignKey(
        UserModel,
        on_delete=CASCADE,
        related_name="files_uploaded"
    )

    original_name = models.CharField(
        max_length=255,
        db_index=True
    )

    # stored_name = models.CharField(
    #     max_length=255,
    #     default=original_name
    # )

    file = models.FileField(
        upload_to="uploads/"
    )

    # file_extention = models.CharField()

    mime_type = models.CharField(
        max_length=100
    )

    file_type = models.CharField(
        max_length=20,
        choices=FileType.choices
    )

    extension = models.CharField(
        max_length=10,
        editable=False
    )

    file_size = models.BigIntegerField()

    is_deleted = models.BooleanField(default=False)

    deleted_at = models.DateTimeField(
        null=True, blank=True
    )

    class Meta:
      indexes = [
        models.Index(fields=["workspace"]),
        models.Index(fields=["uploaded_by"]),
        models.Index(fields=["file_type"]),
        models.Index(fields=["is_deleted"]),
      ]

    def __str__(self):
        return f"{self.uploaded_by.username} -> {self.original_name}"
    

class FileAttach(UUIDModel):
    file = models.ForeignKey(
        File,
        on_delete=CASCADE,
        related_name="attachments"
    )

    resource_type = models.CharField(
        max_length=20,
        choices=AttachmentResourceType.choices
    )

    resource_id = models.UUIDField()

    attached_by = models.ForeignKey(
        UserModel,
        on_delete=CASCADE,
        related_name="file_attachments"
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=[
                    "file",
                    "resource_type",
                    "resource_id",
                ],
                name="unique_file_attachment",
            )
        ]

        indexes = [
            models.Index(
                fields=["resource_type", "resource_id"]
            ),
            models.Index(fields=["file"]),
            models.Index(fields=["attached_by"]),
        ]

    def __str__(self):
        return (
            f"{self.file.original_name} "
            f"attached to {self.resource_type}"
        )



