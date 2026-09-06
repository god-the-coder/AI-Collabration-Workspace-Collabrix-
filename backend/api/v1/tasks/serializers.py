from rest_framework import serializers
from apps.tasks.models import Task
from apps.accounts.models import UserModel
from apps.workspaces.models import Workspace
from apps.projects.models import Project
from apps.tasks.models import Task, TaskPriorities, TaskStatus, Milestone


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


class CreateTaskResponseSerializer(serializers.ModelSerializer):

    assignee = serializers.SerializerMethodField()
    created_by = serializers.SerializerMethodField()

    class Meta:
        model = Task

        fields = [
            "id",
            "title",
            "description",
            "priority",
            "status",
            "workspace",
            "project",
            "due_date",
            "completed_at",
            "assignee",
            "created_by",
            "created_at",
            "updated_at",
        ]

    def get_assignee(self, obj):
        if not obj.assignee:
            return None

        avatar = None

        if obj.assignee.avatar:
            avatar = obj.assignee.avatar.file.url

        initials = (
            f"{obj.assignee.first_name[:1].upper() if obj.assignee.first_name else ''}"
            f"{obj.assignee.last_name[:1].upper() if obj.assignee.last_name else ''}"
        )

        return {
            "id": obj.assignee.id,
            "username": obj.assignee.username,
            "avatar": avatar,
            "initials": initials
        }

    def get_created_by(self, obj):
        avatar = None

        if obj.created_by.avatar:
            avatar = obj.created_by.avatar.file.url

        initials = (
            f"{obj.created_by.first_name[:1].upper() if obj.created_by.first_name else ''}"
            f"{obj.created_by.last_name[:1].upper() if obj.created_by.last_name else ''}"
        )

        return {
            "id": obj.created_by.id,
            "username": obj.created_by.username,
            "avatar": avatar,
            "initials": initials
        }


class CreateTaskSerializer(serializers.Serializer):

    title = serializers.CharField(
        max_length=255,
        required=True
    )

    description = serializers.CharField(
        required=False,
        allow_blank=True,
        allow_null=True
    )

    priority = serializers.ChoiceField(
        choices=TaskPriorities.choices,
        required=False,
        default=TaskPriorities.MEDIUM
    )

    status = serializers.ChoiceField(
        choices=TaskStatus.choices,
        required=False,
        default=TaskStatus.TODO
    )

    project_id = serializers.UUIDField(
        required=False,
        allow_null=True
    )

    assignee_id = serializers.UUIDField(
        required=False,
        allow_null=True
    )

    parent_task_id = serializers.UUIDField(
        required=False,
        allow_null=True
    )

    milestone_id = serializers.UUIDField(
        required=False,
        allow_null=True
    )

    due_date = serializers.DateField(
        required=False,
        allow_null=True
    )




class GlobalTaskUserSerializer(serializers.ModelSerializer):
    initials = serializers.SerializerMethodField()
    avatar = serializers.SerializerMethodField()

    class Meta:
        model = UserModel
        fields = [
            "id",
            "username",
            "first_name",
            "last_name",
            "initials",
            "avatar",
        ]

    def get_initials(self, obj):
        first = obj.first_name[:1].upper() if obj.first_name else ""
        last = obj.last_name[:1].upper() if obj.last_name else ""

        return f"{first}{last}"

    def get_avatar(self, obj):
        if obj.avatar:
            return obj.avatar.file.url

        return None


class GlobalTaskWorkspaceSerializer(serializers.ModelSerializer):

    class Meta:
        model = Workspace
        fields = [
            "id",
            "name",
        ]


class GlobalTaskProjectSerializer(serializers.ModelSerializer):

    class Meta:
        model = Project
        fields = [
            "id",
            "name",
        ]


class GlobalTaskSerializer(serializers.ModelSerializer):
    workspace = GlobalTaskWorkspaceSerializer(read_only=True)
    project = GlobalTaskProjectSerializer(
        read_only=True,
        allow_null=True
    )

    assignee = GlobalTaskUserSerializer(
        read_only=True,
        allow_null=True
    )

    created_by = GlobalTaskUserSerializer(
        read_only=True
    )

    class Meta:
        model = Task
        fields = [
            "id",
            "title",
            "description",
            "priority",
            "status",
            "due_date",
            "completed_at",
            "updated_at",
            "workspace",
            "project",
            "assignee",
            "created_by",
        ]


class GlobalTaskSectionSerializer(serializers.Serializer):
    count = serializers.IntegerField()
    tasks = GlobalTaskSerializer(many=True)


class GlobalTaskOverviewSerializer(serializers.Serializer):
    assigned_to_me = serializers.IntegerField()
    due_today = serializers.IntegerField()
    overdue = serializers.IntegerField()
    completed_this_week = serializers.IntegerField()


class GlobalTaskResponseSerializer(serializers.Serializer):
    overview = GlobalTaskOverviewSerializer()
    due_today = GlobalTaskSectionSerializer()
    overdue = GlobalTaskSectionSerializer()
    upcoming = GlobalTaskSectionSerializer()




class TaskDetailUserSerializer(serializers.ModelSerializer):
    initials = serializers.SerializerMethodField()
    avatar = serializers.SerializerMethodField()

    class Meta:
        model = UserModel
        fields = [
            "id",
            "username",
            "first_name",
            "last_name",
            "initials",
            "avatar",
        ]

    def get_initials(self, obj):
        first = obj.first_name[:1].upper() if obj.first_name else ""
        last = obj.last_name[:1].upper() if obj.last_name else ""

        return f"{first}{last}"

    def get_avatar(self, obj):
        if obj.avatar:
            return obj.avatar.file.url

        return None


class TaskDetailWorkspaceSerializer(serializers.ModelSerializer):

    class Meta:
        model = Workspace
        fields = [
            "id",
            "name",
        ]


class TaskDetailProjectSerializer(serializers.ModelSerializer):

    class Meta:
        model = Project
        fields = [
            "id",
            "name",
        ]


class TaskDetailMilestoneSerializer(serializers.ModelSerializer):

    class Meta:
        model = Milestone
        fields = [
            "id",
            "name",
        ]


class TaskDetailParentTaskSerializer(serializers.ModelSerializer):

    class Meta:
        model = Task
        fields = [
            "id",
            "title",
        ]


class TaskDetailSubtaskSerializer(serializers.ModelSerializer):
    is_completed = serializers.SerializerMethodField()

    class Meta:
        model = Task
        fields = [
            "id",
            "title",
            "status",
            "is_completed",
        ]

    def get_is_completed(self, obj):
        return obj.status == TaskStatus.COMPLETED



class TaskDetailMetadataSerializer(serializers.Serializer):
    created_at = serializers.DateTimeField()
    updated_at = serializers.DateTimeField()
    completed_at = serializers.DateTimeField(
        allow_null=True
    )


class TaskDetailSerializer(serializers.ModelSerializer):

    workspace = TaskDetailWorkspaceSerializer(
        read_only=True
    )

    project = TaskDetailProjectSerializer(
        read_only=True,
        allow_null=True
    )

    assignee = TaskDetailUserSerializer(
        read_only=True,
        allow_null=True
    )

    milestone = TaskDetailMilestoneSerializer(
        read_only=True,
        allow_null=True
    )

    parent_task = TaskDetailParentTaskSerializer(
        read_only=True,
        allow_null=True
    )

    created_by = TaskDetailUserSerializer(
        read_only=True
    )

    subtasks = TaskDetailSubtaskSerializer(
        many=True,
        read_only=True
    )

    metadata = serializers.SerializerMethodField()

    class Meta:
        model = Task
        fields = [
            "id",
            "title",
            "priority",
            "status",
            "description",
            "workspace",
            "project",
            "assignee",
            "due_date",
            "milestone",
            "parent_task",
            "created_by",
            "subtasks",
            "metadata",
        ]

    def get_metadata(self, obj):
        return {
            "created_at": obj.created_at,
            "updated_at": obj.updated_at,
            "completed_at": obj.completed_at,
        }



