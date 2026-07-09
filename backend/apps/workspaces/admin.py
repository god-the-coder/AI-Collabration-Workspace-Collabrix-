from django.contrib import admin
from .models import Workspace, WorkspaceMember, Invitation, WorkspaceSetting

# Register your models here.
admin.site.register(Workspace)
admin.site.register(WorkspaceSetting)
admin.site.register(WorkspaceMember)
admin.site.register(Invitation)
