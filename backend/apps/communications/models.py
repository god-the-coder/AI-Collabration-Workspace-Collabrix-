from django.db import models
from django.db.models import CASCADE
from common.utils.models import UUIDModel, TimeStampedModel
from apps.accounts.models import UserModel
from apps.projects.models import Project
from apps.workspaces.models import Workspace

# Create your models here.
# class ReactionType(models.TextChoices):
#     THUMBS_UP = "👍", "Thumbs Up"
#     HEART = "❤️", "Heart"
#     LAUGH = "😂", "Laugh"
#     FIRE = "🔥", "Fire"
#     PARTY = "🎉", "Party"
#     EYES = "👀", "Eyes"
#     ROCKET = "🚀", "Rocket"
#     CHECK = "✅", "Check"  


class ConversationType(models.TextChoices):
    GENERAL = "GENERAL", "General"
    PROJECT = "PROJECT", "Project"
    AI = "AI", "AI"
    # GROUP = "GROUP", "Group"
    DIRECT = "DIRECT", "Direct"


class Conversation(UUIDModel, TimeStampedModel):
    workspace = models.ForeignKey(
        Workspace,
        on_delete=CASCADE,
        related_name="conversations"
    )

    project = models.OneToOneField(
        Project,
        on_delete=CASCADE,
        related_name="conversations",
        unique=True,
        null=True,
        blank=True
    )

    conversation_type = models.CharField(
        max_length=20,
        choices=ConversationType.choices,
        default=ConversationType.GENERAL
    )

    name = models.CharField(max_length=32)

    
    def __str__(self):
        return f"conversation: {self.name}"


class Message(UUIDModel, TimeStampedModel):
    sender = models.ForeignKey(
        UserModel,
        on_delete=CASCADE,
        related_name="messages"
    )
    
    conversation = models.ForeignKey(
        Conversation,
        on_delete=CASCADE,
        related_name="messages"
    )

    content = models.TextField()

    is_edited = models.BooleanField(default=False)

    edited_at = models.DateTimeField(null=True, blank=True)

    is_pinned = models.BooleanField(default=False)

    pinned_at = models.DateTimeField(blank=True, null=True)

    pinned_by = models.ForeignKey(
        UserModel,
        on_delete=models.SET_NULL,
        related_name="pinned_messages",
        null=True,
        blank=True
    )

    is_deleted = models.BooleanField(default=False)

    deleted_by = models.ForeignKey(
        UserModel,
        on_delete=models.SET_NULL,
        related_name="messages_deleted",
        blank=True, null=True        
    )

    deleted_at = models.DateTimeField(
        blank=True,
        null=True
    )


    def __str__(self):
        return f"{self.sender.username} -> {self.content[:30]}"
    

class ConversationParticipant(UUIDModel):
    conversation = models.ForeignKey(
        Conversation,
        on_delete=CASCADE,
        related_name="conversation_participants" )
    
    user = models.ForeignKey(
        UserModel,
        on_delete=CASCADE,
        related_name="conversation_participants"
    )

    joined_at = models.DateTimeField(auto_now_add=True)

    last_read_message = models.ForeignKey(
        Message,
        on_delete=models.SET_NULL,
        related_name="+",
        null=True,
        blank=True
    )



    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=["conversation", "user"],
                name="unique_user_for_conversation"
            )
        ]

    
    def __str__(self):
        return f"{self.user.username} -> {self.conversation}"
    

class MessageReaction(UUIDModel):
    message = models.ForeignKey(
        Message,
        on_delete=CASCADE,
        related_name="message_reactions"
    )

    user = models.ForeignKey(
        UserModel,
        on_delete=CASCADE,
        related_name="message_reactions"
    )

    reaction = models.CharField(
        max_length=10
    )

    created_at = models.DateTimeField(auto_now_add=True)


    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=["message", "user", "reaction"],
                name="unique_message_reaction"
            )
        ]

    def __str__(self):
        return f"{self.user.username} -> {self.message.content[:20]} -> {self.reaction}"


class MessageMention(UUIDModel):
    message = models.ForeignKey(
        Message,
        on_delete=CASCADE,
        related_name="message_mentions"
    )

    mention_user = models.ForeignKey(
        UserModel,
        on_delete=CASCADE,
        related_name="mentions"
    )

    created_at = models.DateTimeField(auto_now_add=True)


    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=["message", "mention_user"],
                name="unique_message_mention"
            )
        ]

    def __str__(self):
        return f"{self.message.content[:20]} -> {self.mention_user.username}"


class MessageRead(UUIDModel):
    message = models.ForeignKey(
        Message,
        on_delete=CASCADE,
        related_name="messages_read"
    )

    user = models.ForeignKey(
        UserModel,
        on_delete=CASCADE,
        related_name="messages_read"
    )

    read_at = models.DateTimeField(auto_now_add=True)


    






