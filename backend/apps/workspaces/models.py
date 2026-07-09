from django.db import models
from django.db.models import CASCADE
from common.utils.models import UUIDModel, TimeStampedModel
from apps.accounts.models import UserModel
import uuid
from apps.files.models import File

# Create your models here.
class WorkspaceRole(models.TextChoices):
    OWNER = "OWNER", "Owner"
    ADMIN = "ADMIN", "Admin"
    MEMBER = "MEMBER", "Member"


class InvitationStatus(models.TextChoices):
    PENDING = "PENDING", "Pending"
    ACCEPTED = "ACCEPTED", "Accepted"
    REJECTED = "REJECTED", "Rejected"





class Workspace(UUIDModel, TimeStampedModel):
    owner = models.ForeignKey(UserModel, on_delete=CASCADE, related_name="workspaces", null=False, blank=False)
    logo = models.ForeignKey(File, on_delete=models.SET_NULL, related_name="workspaces_logo", null=True, blank=True)
    name = models.CharField(max_length=255)
    slug = models.SlugField(max_length=255, null=False, blank=False, unique=True)
    description = models.TextField(null=True, blank=True)
    
    def __str__(self):
        return self.name 


class WorkspaceSetting(UUIDModel, TimeStampedModel):
    workspace = models.OneToOneField(
        Workspace, 
        on_delete=CASCADE, 
        related_name="setting_for_workspace")
    allow_member_invites = models.BooleanField(default=False)
    default_member_role = models.CharField(
        max_length=20,
        choices=[
          (WorkspaceRole.MEMBER, "Member"),
          (WorkspaceRole.ADMIN, "Admin"),
        ],
        default=WorkspaceRole.MEMBER,)
    ai_enabled = models.BooleanField(default=True)
    ai_file_access_enabled = models.BooleanField(default=True)
    
    def __str__(self):
        return f'setting for {self.workspace.name}'


class WorkspaceMember(UUIDModel):

    user = models.ForeignKey(
        UserModel,
        on_delete=models.CASCADE,
        related_name="workspace_memberships"
    )

    workspace = models.ForeignKey(
        Workspace,
        on_delete=models.CASCADE,
        related_name="members"
    )

    role = models.CharField(
        max_length=20,
        choices=WorkspaceRole.choices,
        default=WorkspaceRole.MEMBER
    )

    joined_at = models.DateTimeField(
        auto_now_add=True
    )

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=["user", "workspace"],
                name="unique_workspace_member"
            )
        ]

        indexes = [
            models.Index(fields=["workspace"]),
            models.Index(fields=["user"]),
        ]



    def __str__(self):
        return f"{self.user.username} in {self.workspace.name} as {self.role}"
    

class Invitation(UUIDModel):
    invited_by = models.ForeignKey(
        UserModel, 
        on_delete=CASCADE, 
        related_name="sent_invitations")
    
    workspace = models.ForeignKey(
        Workspace, 
        on_delete=CASCADE, 
        related_name="invations_workspace")
    
    email = models.EmailField(db_index=True)

    role = models.CharField(
        max_length=20,
        choices=[(WorkspaceRole.MEMBER, "Member"), (WorkspaceRole.ADMIN, "Member")],
        default=WorkspaceRole.MEMBER
    )

    token = models.UUIDField(
        default=uuid.uuid4,
        unique=True, 
        editable=False)

    expires_at = models.DateTimeField()

    status = models.CharField(
        max_length=20, 
        choices=InvitationStatus.choices, 
        default=InvitationStatus.PENDING)
    
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
      constraints = [
        models.UniqueConstraint(
            fields=["workspace", "email"],
            name="unique_workspace_invitation"
        )
      ]

    def __str__(self):
        return f"invitation by {self.invited_by} for {self.workspace}"
    
