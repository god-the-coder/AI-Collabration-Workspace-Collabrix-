from rest_framework import serializers

from apps.workspaces.models import (
    Workspace,
    WorkspaceMember,
    WorkspaceRole,
    WorkspaceSetting,
)

from apps.accounts.models import UserModel
from apps.projects.models import Project

from api.v1.projects.serializers import ProjectMemberSerializer


class WorkspaceRecentMemberSerializer(serializers.Serializer):

    username = serializers.CharField(
        source="user.username",
        read_only=True,
    )

    avatar = serializers.SerializerMethodField()

    initials = serializers.SerializerMethodField()

    def get_avatar(self, obj):

        if obj.user.avatar:
            return obj.user.avatar.file.url

        return None

    def get_initials(self, obj):

        first = (
            obj.user.first_name[:1].upper()
            if obj.user.first_name
            else ""
        )

        last = (
            obj.user.last_name[:1].upper()
            if obj.user.last_name
            else ""
        )

        return f"{first}{last}"


# ============================================================
# Workspace list
# ============================================================

class WorkspaceListSerializer(serializers.ModelSerializer):

    workspace_logo = serializers.SerializerMethodField()

    initials = serializers.SerializerMethodField()

    recent_members = serializers.SerializerMethodField()

    remaining_members_count = serializers.SerializerMethodField()

    role = serializers.CharField(
        read_only=True
    )

    members_count = serializers.IntegerField(
        read_only=True
    )

    projects_count = serializers.IntegerField(
        read_only=True
    )

    tasks_count = serializers.IntegerField(
        read_only=True
    )

    class Meta:

        model = Workspace

        fields = [
            "id",
            "name",
            "description",
            "workspace_logo",
            "initials",
            "role",
            "members_count",
            "projects_count",
            "tasks_count",
            "recent_members",
            "remaining_members_count",
        ]

    def get_workspace_logo(self, obj):

        if obj.logo:
            return obj.logo.file.url

        return None

    def get_initials(self, obj):

        words = obj.name.split()

        if len(words) >= 2:

            return (
                words[0][0]
                + words[1][0]
            ).upper()

        return obj.name[:2].upper()

    def get_recent_members(self, obj):

        serializer = WorkspaceRecentMemberSerializer(
            obj.members.all()[:3],
            many=True,
        )

        return serializer.data

    def get_remaining_members_count(self, obj):

        return max(
            obj.members_count - 3,
            0
        )


# ============================================================
# Create Workspace
# ============================================================

class CreateWorkspaceSerializer(serializers.Serializer):

    name = serializers.CharField(
        required=True,
        min_length=5,
        max_length=255,
    )

    description = serializers.CharField(
        required=False,
        allow_blank=True,
    )

    logo = serializers.FileField(
        required=False,
    )


# ============================================================
# Workspace owner
# ============================================================

class WorkspaceOwnerSerializer(serializers.ModelSerializer):

    class Meta:

        model = UserModel

        fields = [
            "id",
            "username",
        ]


# ============================================================
# Create Workspace response
# ============================================================

class CreateWorkspaceResponseSerializer(
    serializers.ModelSerializer
):

    owner = WorkspaceOwnerSerializer(
        read_only=True
    )

    class Meta:

        model = Workspace

        fields = [
            "id",
            "name",
            "owner",
            "description",
        ]


# ============================================================
# Workspace layout
# ============================================================

class WorkspaceLayoutSerializer(serializers.ModelSerializer):

    logo = serializers.SerializerMethodField()

    initials = serializers.SerializerMethodField()

    role = serializers.CharField(
        read_only=True
    )

    members_count = serializers.IntegerField(
        read_only=True
    )

    tasks_count = serializers.IntegerField(
        read_only=True
    )

    projects_count = serializers.IntegerField(
        read_only=True
    )

    class Meta:

        model = Workspace

        fields = [
            "id",
            "name",
            "description",
            "role",
            "members_count",
            "projects_count",
            "tasks_count",
            "logo",
            "initials",
        ]

    def get_initials(self, obj):

        words = obj.name.split()

        if len(words) >= 2:

            return (
                words[0][0]
                + words[1][0]
            ).upper()

        return obj.name[:2].upper()

    def get_logo(self, obj):

        if obj.logo:
            return obj.logo.file.url

        return None


# ============================================================
# Workspace general settings (name, description, slug, logo)
# ============================================================

class WorkspaceGeneralSerializer(serializers.ModelSerializer):

    logo = serializers.SerializerMethodField()

    initials = serializers.SerializerMethodField()

    class Meta:

        model = Workspace

        fields = [
            "id",
            "name",
            "description",
            "slug",
            "logo",
            "initials",
        ]

    def get_logo(self, obj):

        if obj.logo:
            return obj.logo.file.url

        return None

    def get_initials(self, obj):

        words = obj.name.split()

        if len(words) >= 2:

            return (
                words[0][0]
                + words[1][0]
            ).upper()

        return obj.name[:2].upper()


class WorkspaceGeneralUpdateSerializer(serializers.Serializer):

    name = serializers.CharField(
        required=False,
        min_length=3,
        max_length=255,
    )

    description = serializers.CharField(
        required=False,
        allow_blank=True,
    )

    slug = serializers.SlugField(
        required=False,
        max_length=255,
    )

    logo = serializers.FileField(
        required=False
    )


# ============================================================
# Workspace settings response
# ============================================================

class WorkspaceSettingSerializer(
    serializers.ModelSerializer
):

    workspace_id = serializers.UUIDField(
        source="workspace.id",
        read_only=True,
    )

    class Meta:

        model = WorkspaceSetting

        fields = [
            "workspace_id",
            "allow_member_invites",
            "default_member_role",
            "ai_enabled",
            "ai_file_access_enabled",
        ]


# ============================================================
# Workspace settings update
# ============================================================

class WorkspaceSettingsUpdateSerializer(
    serializers.Serializer
):

    allow_member_invites = serializers.BooleanField(
        required=False
    )

    default_member_role = serializers.ChoiceField(
        required=False,
        choices=[
            ("MEMBER", "Member"),
            ("ADMIN", "Admin"),
        ],
    )

    ai_enabled = serializers.BooleanField(
        required=False
    )

    ai_file_access_enabled = serializers.BooleanField(
        required=False
    )

    def validate_default_member_role(self, value):

        return value


# ============================================================
# Workspace overview + projects
# ============================================================

class WorkspaceOverviewAndProjectsSerializer(
    serializers.ModelSerializer
):

    members_count = serializers.IntegerField(
        read_only=True
    )

    members = serializers.SerializerMethodField()

    class Meta:

        model = Project

        fields = [
            "id",
            "name",
            "status",
            "description",
            "updated_at",
            "due_date",
            "members_count",
            "members",
        ]

    def get_members(self, obj):

      members = obj.members.all()[:3]

      return ProjectMemberSerializer(
        members,
        many=True
      ).data


# ============================================================
# Workspace member
# Full serializer used by Workspace Members API
# ============================================================

class WorkspaceMemberSerializer(
    serializers.ModelSerializer
):

    user_id = serializers.UUIDField(
        source="user.id",
        read_only=True,
    )

    username = serializers.CharField(
        source="user.username",
        read_only=True,
    )

    email = serializers.EmailField(
        source="user.email",
        read_only=True,
    )

    avatar = serializers.SerializerMethodField()

    initials = serializers.SerializerMethodField()

    status = serializers.SerializerMethodField()

    last_active_at = serializers.SerializerMethodField()

    is_current_user = serializers.SerializerMethodField()

    class Meta:

        model = WorkspaceMember

        fields = [
            "id",
            "user_id",
            "username",
            "email",
            "avatar",
            "initials",
            "role",
            "status",
            "joined_at",
            "last_active_at",
            "is_current_user",
        ]

    def get_avatar(self, obj):

        if obj.user.avatar:
            return obj.user.avatar.file.url

        return None

    def get_initials(self, obj):

        username = obj.user.username

        words = username.split()

        if len(words) >= 2:

            return (
                words[0][0]
                + words[1][0]
            ).upper()

        return username[:2].upper()

    def get_is_current_user(self, obj):

        request = self.context.get("request")

        if request is None:
            return False

        return obj.user == request.user

    def get_status(self, obj):

        return "OFFLINE"

    def get_last_active_at(self, obj):

        session = (
            obj.user.sessions
            .filter(
                revoked_at__isnull=True
            )
            .order_by(
                "-last_active_at"
            )
            .first()
        )

        if session:
            return session.last_active_at

        return None


# ============================================================
# Invite member
# ============================================================

class InviteMemberSerializer(
    serializers.Serializer
):

    email = serializers.EmailField(
        required=True
    )

    role = serializers.ChoiceField(
        choices=[
            (WorkspaceRole.ADMIN, "Admin"),
            (WorkspaceRole.MEMBER, "Member"),
        ],
        required=True,
    )


# ============================================================
# Change member role
# ============================================================

class ChangeMemberRoleSerializer(
    serializers.Serializer
):

    role = serializers.ChoiceField(
        choices=[
            (WorkspaceRole.ADMIN, "Admin"),
            (WorkspaceRole.MEMBER, "Member"),
        ],
        required=True,
    )


# ============================================================
# Member role response
# ============================================================

class MemberRoleResponseSerializer(
    serializers.ModelSerializer
):

    class Meta:

        model = WorkspaceMember

        fields = [
            "id",
            "role",
        ]