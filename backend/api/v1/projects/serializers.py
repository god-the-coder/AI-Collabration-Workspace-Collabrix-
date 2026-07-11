from rest_framework import serializers
from apps.projects.models import Project, ProjectMember, ProjectStatus


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
    



