from django.contrib import admin
from .models import Task, TaskComment

# Register your models here.
admin.site.register(Task)
admin.site.register(TaskComment)