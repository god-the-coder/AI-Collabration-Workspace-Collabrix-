from rest_framework import serializers
from apps.projects.models import Project, ProjectMember, ProjectStatus
from apps.tasks.models import Task

class ProjectWorkspaceSerializer(serializers.Serializer):
    id = serializers.UUIDField(read_only=True)
    name = serializers.CharField(read_only=True)


class ProjectMemberSerializer(serializers.Serializer):
    username = serializers.CharField(
        source="user.username",
        read_only=True
    )

    avatar = serializers.SerializerMethodField()
    initials = serializers.SerializerMethodField()

    def get_avatar(self, obj):
        if obj.user.avatar:
            # Replace according to your File model
            return obj.user.avatar.file.url

        return None

    def get_initials(self, obj):
        first = obj.user.first_name[:1].upper() if obj.user.first_name else ""
        last = obj.user.last_name[:1].upper() if obj.user.last_name else ""

        return f"{first}{last}"


class ProjectListSerializer(serializers.ModelSerializer):

    workspace = ProjectWorkspaceSerializer(
        read_only=True
    )

    members = serializers.SerializerMethodField()

    members_count = serializers.IntegerField(
        read_only=True
    )

    remaining_members_count = serializers.SerializerMethodField()

    class Meta:
        model = Project
        fields = [
            "id",
            "name",
            "description",
            "workspace",
            "members",
            "members_count",
            "remaining_members_count",
            "due_date",
        ]

    def get_members(self, obj):
        serializer = ProjectMemberSerializer(
            obj.members.all()[:3],
            many=True
        )
        return serializer.data

    def get_remaining_members_count(self, obj):
        return max(
            obj.members_count - 3,
            0
        )


class CreateProjectResponseSerializer(serializers.ModelSerializer):

    owner = serializers.CharField(
        source="owner.username"
    )

    workspace = serializers.CharField(
        source="workspace.name"
    )

    class Meta:
        model=Project
        fields=[
            "id",
            "owner",
            "workspace",
            "name"
        ]


class CreateProjectSerializer(serializers.Serializer):
    workspace_id=serializers.UUIDField(write_only=True)
    name=serializers.CharField(
        min_length=5,
        max_length=255,
        write_only=True
    )
    description=serializers.CharField(
        write_only=True,
        required=False,
        allow_blank=True
    )
    start_date=serializers.DateField(
        write_only=True
    )
    due_date=serializers.DateField(
        write_only=True,
        required=False,
        allow_null=True
    )
    status=serializers.ChoiceField(
        choices=ProjectStatus.choices,
        required=False,
        default=ProjectStatus.PLANNING,
        write_only=True
    )    


class ProjectDetailSerializer(serializers.ModelSerializer):

    workspace_name = serializers.CharField(
        source="workspace.name",
        read_only=True
    )

    progress_percentage = serializers.SerializerMethodField()

    initials = serializers.SerializerMethodField()

    # completed_tasks = serializers.IntegerField()

    total_tasks = serializers.IntegerField()

    members_count = serializers.IntegerField()

    class Meta:
        model = Project

        fields = [
            "id",
            "name",
            "description",
            "workspace_name",
            "status",
            # "priority",
            "progress_percentage",
            # "completed_tasks",
            "total_tasks",
            "members_count",
            "initials",
        ]

    def get_progress_percentage(self, obj):

        if obj.total_tasks == 0:
            return 0

        return round(
            (obj.completed_tasks / obj.total_tasks) * 100
        )

    def get_initials(self, obj):

        words = obj.name.split()

        if len(words) >= 2:
            return (
                words[0][0] +
                words[1][0]
            ).upper()

        return obj.name[:2].upper()


class ProjectOverviewSerializer(serializers.ModelSerializer):

    workspace = serializers.SerializerMethodField()

    summary = serializers.SerializerMethodField()

    task_progress = serializers.SerializerMethodField()

    class Meta:
        model = Project

        fields = [
            "id",
            "name",
            "description",
            "workspace",
            "status",
            "summary",
            "task_progress",
        ]

    def get_workspace(self, obj):

        return {
            "id": obj.workspace.id,
            "name": obj.workspace.name
        }

    def get_summary(self, obj):

        progress = 0

        if obj.total_tasks:
            progress = round(
                obj.completed_tasks /
                obj.total_tasks * 100
            )

        return {
            "members_count": obj.members_count,
            "total_tasks": obj.total_tasks,
            "completed_tasks": obj.completed_tasks,
            "overdue_tasks": obj.overdue_tasks,
            "progress_percentage": progress
        }

    def get_task_progress(self, obj):

        total = obj.total_tasks or 1

        return {

            "todo": {
                "count": obj.todo_tasks,
                "percentage": round(
                    obj.todo_tasks / total * 100
                )
            },

            "in_progress": {
                "count": obj.in_progress_tasks,
                "percentage": round(
                    obj.in_progress_tasks / total * 100
                )
            },

            "review": {
                "count": obj.review_tasks,
                "percentage": round(
                    obj.review_tasks / total * 100
                )
            },

            "completed": {
                "count": obj.completed_tasks,
                "percentage": round(
                    obj.completed_tasks / total * 100
                )
            }

        }


class TaskCardSerializer(serializers.ModelSerializer):

    assignee = serializers.SerializerMethodField()
    # comments_count = serializers.IntegerField()
    # attachments_count = serializers.IntegerField()

    class Meta:
        model = Task

        fields = [
            "id",
            "title",
            "status",
            "priority",
            "due_date",
            # "comments_count",
            # "attachments_count",
            "assignee",
        ]

    def get_assignee(self, obj):

        if obj.assignee is None:
            return None

        return {
            "id": obj.assignee.id,
            "username": obj.assignee.username,
            "avatar": (
                obj.assignee.avatar.file.url
                if obj.assignee.avatar
                else None
            ),
            "initials": (
                obj.assignee.first_name[:1] +
                obj.assignee.last_name[:1]
            ).upper()
        }


    def get_avatar(self, obj):

        if obj.user.avatar:
            return obj.user.avatar.file.url

        return None


    def get_initials(self, obj):

        return (
            obj.user.first_name[:1] +
            obj.user.last_name[:1]
        ).upper()


    def get_last_active_at(self, obj):

        session = obj.user.sessions.filter(
            revoked_at__isnull=True
        ).order_by(
            "-last_active_at"
        ).first()

        if session:
            return session.last_active_at

        return None


    def get_is_current_user(self, obj):

        return (
            obj.user ==
            self.context["request"].user
        )


    def get_task_summary(self, obj):

        assigned = obj.assigned_tasks

        completed = obj.completed_tasks

        if assigned == 0:
            rate = 0
        else:
            rate = round(
                completed / assigned * 100
            )

        return {
            "assigned": assigned,
            "completed": completed,
            "completion_rate": rate
        }
    

class ProjectMemberCardSerializer(serializers.ModelSerializer):

    id = serializers.UUIDField(
        source="user.id",
        read_only=True
    )

    username = serializers.CharField(
        source="user.username",
        read_only=True
    )

    handle = serializers.SerializerMethodField()

    avatar = serializers.SerializerMethodField()

    initials = serializers.SerializerMethodField()

    role = serializers.CharField(
        source="workspace_role",
        read_only=True
    )

    joined_at = serializers.DateTimeField(
        read_only=True
    )

    assigned_tasks = serializers.IntegerField(
        read_only=True
    )

    class Meta:

        model = ProjectMember

        fields = [
            "id",
            "username",
            "handle",
            "avatar",
            "initials",
            "role",
            "joined_at",
            "assigned_tasks"
        ]

    def get_handle(self, obj):
        return f"@{obj.user.username}"

    def get_avatar(self, obj):

        if obj.user.avatar:
            return obj.user.avatar.file.url

        return None

    def get_initials(self, obj):

        username = obj.user.username.split()

        if len(username) >= 2:
            return (
                username[0][0] +
                username[1][0]
            ).upper()

        return obj.user.username[:2].upper()


class ProjectMembersResponseSerializer(serializers.Serializer):

    members = ProjectMemberCardSerializer(
        many=True
    )


