from rest_framework import serializers
from apps.accounts.models import UserModel
from apps.workspaces.models import Workspace
from apps.projects.models import Project


class ProfileSerializer(serializers.ModelSerializer):
    avatar = serializers.SerializerMethodField()
    initials = serializers.SerializerMethodField()

    class Meta:
        model=UserModel
        fields=[
            'id',
            'username',
            'email',
            'bio',
            'avatar',
            'initials',
            'date_joined',
            'is_email_verified'
        ]

    
    def get_avatar(self, obj):
        if obj.avatar:
            return obj.avatar.file.url
        return None
    
    def get_initials(self, obj):
        first = obj.first_name[:1].upper() if obj.first_name else ""
        last = obj.last_name[:1].upper() if obj.last_name else ""

        return f"{first}{last}"



class ProfileContactSerializer(serializers.ModelSerializer):
    class Meta:
        model= UserModel
        fields=[
            'email'
        ]


class ProfileAboutSerializer(serializers.ModelSerializer):
    class Meta:
        model= UserModel
        fields=[
            'email',
            'date_joined'
        ]



class ProfileWorkspaceSerializer(serializers.ModelSerializer):

    role = serializers.CharField(read_only=True)
    logo = serializers.SerializerMethodField()

    class Meta:
        model=Workspace
        fields=[
            'id',
            'name',
            'role',
            'logo'
        ]

    def get_logo(self, obj):
        if obj.logo:
            return obj.logo.file.url
        return None
    


class WorkspaceSerializer(serializers.ModelSerializer):
    class Meta:
        model=Workspace
        fields=[
            'id',
            'name'
        ]


class ProfileProjectsSerializer(serializers.ModelSerializer):

    workspace = WorkspaceSerializer()

    class Meta:
        model=Project
        fields=[
            'id',
            'name',
            'status',
            'workspace'            
        ]
