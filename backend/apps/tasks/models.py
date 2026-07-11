from django.db import models
from django.db.models import CASCADE
from apps.accounts.models import UserModel
from apps.workspaces.models import Workspace
from apps.projects.models import Project, Milestone
from common.utils.models import UUIDModel, TimeStampedModel
# Create your models here.
class TaskPriorities(models.TextChoices):
    LOW = 'LOW', 'Low'
    HIGH = 'HIGH', 'High'
    MEDIUM = 'MEDIUM', 'Medium'
    CRITICAL = 'CRITICAL', 'Critical'


class TaskStatus(models.TextChoices):
    TODO = "TODO", "To Do"
    IN_PROGRESS = "IN_PROGRESS", "In Progress"
    IN_REVIEW = "IN_REVIEW", "In Review"
    COMPLETED = "COMPLETED", "Completed"
    CANCELLED = "CANCELLED", "Cancelled"


class Task(UUIDModel, TimeStampedModel):
    workspace = models.ForeignKey(
        Workspace,
        on_delete=CASCADE,
        related_name="tasks"
    )

    project = models.ForeignKey(
        Project,
        on_delete=models.SET_NULL,
        related_name="tasks",
        null=True,
        blank=True
    )

    created_by = models.ForeignKey(
        UserModel,
        on_delete=CASCADE,
        related_name="tasks_created"
    )

    assignee = models.ForeignKey(
        UserModel,
        on_delete=CASCADE,
        related_name="tasks_assigned",
        blank=True,
        null=True
    )

    parent_task = models.ForeignKey(
        "self",
        on_delete=CASCADE,
        related_name="subtasks",
        blank=True,
        null=True
    )

    milestone = models.ForeignKey(
        Milestone,
        on_delete=CASCADE,
        related_name="tasks",
        null=True,
        blank=True
    )

    title = models.CharField(max_length=255)

    description = models.TextField(null=True, blank=True)

    priority = models.CharField(
        max_length=20,
        choices=TaskPriorities.choices,
        default=TaskPriorities.MEDIUM
    )

    status = models.CharField(
        max_length=20,
        choices=TaskStatus.choices,
        default=TaskStatus.TODO
    )

    due_date = models.DateField(null=True, blank=True)

    completed_at = models.DateTimeField(null=True, blank=True)

    
    # class Meta:
    #     constraints = [
    #         models.UniqueConstraint(
    #             fields=["project", "title"],
    #             name="unique_project_tasks"
    #         )
    #     ]

    def __str__(self):
        return f"{self.title} ({self.project.name if self.project else 'Workspace'})"



class TaskComment(UUIDModel, TimeStampedModel):
    task = models.ForeignKey(
        Task,
        on_delete=CASCADE,
        related_name="task_comment"
    )

    author = models.ForeignKey(
        UserModel,
        on_delete=CASCADE,
        related_name="tasks_author"
    )

    content = models.TextField()

    edited_at = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return f"{self.author.username} commented on {self.task.title}"


