from rest_framework import serializers
from apps.workspaces.models import Workspace
from apps.accounts.models import UserModel


class WorkspaceMemberSerializer(serializers.Serializer):
    username = serializers.CharField(
        source="user.username",
        read_only=True
    )

    avatar = serializers.SerializerMethodField()
    initials = serializers.SerializerMethodField()

    

    def get_avatar(self, obj):
        if obj.user.avatar:
            return obj.user.avatar.file.url

        return None

    def get_initials(self, obj):
        first = obj.user.first_name[:1].upper() if obj.user.first_name else ""
        last = obj.user.last_name[:1].upper() if obj.user.last_name else ""

        return f"{first}{last}"


class WorkspaceListSerializer(serializers.ModelSerializer):

    workspace_logo = serializers.SerializerMethodField()

    recent_members = serializers.SerializerMethodField()

    remaining_members_count = serializers.SerializerMethodField()
    
    role = serializers.CharField(read_only=True)

    members_count = serializers.IntegerField()

    projects_count = serializers.IntegerField()

    tasks_count = serializers.IntegerField()

    class Meta:
        model = Workspace
        fields = [
            "id",
            "name",
            "description",
            "workspace_logo",
            "role",
            "members_count",
            "projects_count",
            "tasks_count",
            # "status_type",
            # "status_message",
            # "recent_activity_title",
            # "recent_activity_time",
            "recent_members",
            "remaining_members_count",
        ]

    def get_workspace_logo(self, obj):
        if obj.logo:
            return obj.logo.file.url      
        return None
    
    def get_recent_members(self, obj):
        serializer = WorkspaceMemberSerializer(
            obj.members.all()[:3],
            many=True
        )
        return serializer.data

    def get_remaining_members_count(self, obj):
        return max(
            obj.members_count - 3,
            0
        )
    

class CreateWorkspaceSerializer(serializers.Serializer):
    name = serializers.CharField(
        required=True,
        min_length=5,
        max_length=255
    )
    description = serializers.CharField(
        required=False,
        allow_blank=True
    )
    logo = serializers.FileField(required=False)


class WorkspaceOwnerSerializer(serializers.ModelSerializer):
    class Meta:
        model=UserModel
        fields=[
            "id",
            "username"
        ] 

class CreateWorkspaceResponseSerializer(serializers.ModelSerializer):

    owner = WorkspaceOwnerSerializer(read_only=True)


    class Meta:
        model = Workspace
        fields=[
            "id",
            "name",
            "owner",
            "description"
        ]


class WorkspaceLayoutSerializer(serializers.ModelSerializer):

    logo=serializers.SerializerMethodField()
    initials=serializers.SerializerMethodField()
    role=serializers.CharField(read_only=True)
    members_count=serializers.IntegerField(read_only=True)
    tasks_count=serializers.IntegerField(read_only=True)
    projects_count=serializers.IntegerField(read_only=True)
    
    class Meta:
        model=Workspace
        fields=[
            "id",
            "name",
            "description",
            "role",
            "members_count",
            "projects_count",
            "tasks_count",
            "logo",
            "initials"
        ]

    def get_initials(self, obj):

        words = obj.name.split()

        if len(words) >= 2:
            return (
                words[0][0] +
                words[1][0]
            ).upper()

        return obj.name[:2].upper()
    

    def get_logo(self, obj):
        if obj.logo:
            return obj.logo.file.url
        return None


class WorkspaceOverviewSerializer(serializers.ModelSerializer):
    pass

