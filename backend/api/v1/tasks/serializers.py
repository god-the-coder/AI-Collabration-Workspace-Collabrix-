from rest_framework import serializers
from apps.tasks.models import Task
from apps.accounts.models import UserModel
from apps.workspaces.models import Workspace
from apps.projects.models import Project
from apps.tasks.models import Task


class ParentTaskSerializer(serializers.ModelSerializer):
    class Meta:
        model=Task
        fields=[
            "id",
            "title"
        ]


class WorksapceSerializer(serializers.ModelSerializer):
    class Meta:
        model=Workspace
        fields=[
            "id",
            "name"
        ]

class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model=Project
        fields=[
            "id",
            "name"
        ]

class Created_by_serializer(serializers.ModelSerializer):
    
    
    avatar = serializers.SerializerMethodField()
    initials = serializers.SerializerMethodField()

    class Meta:
        model=UserModel
        fields=[
            "id",
            "username",
            "avatar",
            "initials"
        ]

    def get_avatar(self, obj):
        if obj.avatar:
            return obj.avatar.file.url
        return None

    def get_initials(self, obj):
        first = obj.first_name[:1].upper() if obj.first_name else ""
        last = obj.last_name[:1].upper() if obj.last_name else ""

        return f"{first}{last}"


class TasksListSerializer(serializers.ModelSerializer):
    workspace = WorksapceSerializer()
    project = ProjectSerializer()
    created_by = Created_by_serializer()
    parent_task = ParentTaskSerializer()


    class Meta:
        model = Task
        fields=[
            "id",
            "title",
            "description",
            "workspace",
            "project",
            "priority",
            "status",
            "due_date",
            "parent_task",
            "created_by",
            "updated_at"
        ]


class TasksListWrapperSerializer(serializers.Serializer):
    due_today = TasksListSerializer(many=True)
    overdue = TasksListSerializer(many=True)
    upcoming = TasksListSerializer(many=True)



