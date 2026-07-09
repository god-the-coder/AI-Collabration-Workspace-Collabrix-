from django.db import models
from django.db.models import CASCADE
from apps.accounts.models import UserModel
from apps.workspaces.models import Workspace
from common.utils.models import UUIDModel, TimeStampedModel


# Create your models here.
class ProjectRole(models.TextChoices):
    ADMIN = "ADMIN", "Admin"
    MEMBER = "MEMBER", "Member"


class ProjectStatus(models.TextChoices):
    PLANNING = "PLANNING", "Planning"
    ACTIVE = "ACTIVE", "Active"
    ON_HOLD = "ON_HOLD", "On Hold"
    COMPLETED = "COMPLETED", "Completed"
    CANCELLED = "CANCELLED", "Cancelled"


class MilestoneStatus(models.TextChoices):
    PENDING = "PENDING", "Pending"
    IN_PROGRESS = "IN_PROGRESS", "In Progress"
    COMPLETED = "COMPLETED", "Completed"


class Project(UUIDModel, TimeStampedModel):

    owner = models.ForeignKey(
        UserModel,
        on_delete=models.CASCADE,
        related_name="owned_projects"
    )

    workspace = models.ForeignKey(
        Workspace,
        on_delete=models.CASCADE,
        related_name="projects"
    )

    name = models.CharField(
        max_length=255
    )

    description = models.TextField(
        null=True,
        blank=True
    )

    start_date = models.DateTimeField()

    due_date = models.DateTimeField(null=True, blank=True)

    status = models.CharField(
        max_length=20,
        choices=ProjectStatus.choices,
        default=ProjectStatus.PLANNING
    )

    is_archived = models.BooleanField(
        default=False
    )

    archived_at = models.DateTimeField(
        null=True,
        blank=True
    )

    is_deleted = models.BooleanField(
        default=False
    )

    deleted_at = models.DateTimeField(
        null=True,
        blank=True
    )


class ProjectMember(UUIDModel):
    user = models.ForeignKey(
        UserModel, 
        on_delete=CASCADE, 
        related_name="project_memberships")

    project = models.ForeignKey(
        Project, 
        on_delete=CASCADE, 
        related_name="members"
    )
    
    role = models.CharField(
        max_length=20, 
        choices=ProjectRole.choices, 
        default=ProjectRole.MEMBER)
    
    joined_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=["user", "project"],
                name="unique_project_member"
            )
        ]

    def __str__(self):
        return f"{self.user.username} is member of {self.project.name}"


class Milestone(UUIDModel, TimeStampedModel):
    project = models.ForeignKey(
        Project, 
        on_delete=CASCADE, 
        related_name="milestones")
    
    title = models.CharField(
        max_length=64)
    
    description = models.TextField(
        null=True,
        blank=True
    )

    due_date = models.DateField()

    status = models.CharField(
        max_length=20,
        choices=MilestoneStatus.choices,
        default=MilestoneStatus.PENDING
    )

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=["project", "title"],
                name="unique_project_milestone"
            )
        ]

    def __str__(self):
        return f"{self.project.name} -> {self.title}"





