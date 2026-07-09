from django.contrib import admin
from apps.communications.models import Message,MessageMention, MessageReaction, MessageRead, Conversation, ConversationParticipant
# Register your models here.
admin.site.register(Message)
admin.site.register(MessageRead)
admin.site.register(MessageReaction)
admin.site.register(MessageMention)
admin.site.register(Conversation)
admin.site.register(ConversationParticipant)