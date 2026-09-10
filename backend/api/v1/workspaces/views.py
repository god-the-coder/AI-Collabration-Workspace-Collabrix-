from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import PermissionDenied
from rest_framework.permissions import IsAuthenticated

from apps.workspaces.models import Workspace

from .services import (
    WorkspaceService,
    WorkspaceMembersService,
    InvitationService,
)

from .serializers import (
    WorkspaceMemberSerializer,
    WorkspaceOverviewAndProjectsSerializer,
    WorkspaceLayoutSerializer,
    WorkspaceListSerializer,
    CreateWorkspaceSerializer,
    CreateWorkspaceResponseSerializer,
    InviteMemberSerializer,
    ChangeMemberRoleSerializer,
    MemberRoleResponseSerializer,
    WorkspaceGeneralSerializer,
    WorkspaceGeneralUpdateSerializer,
    WorkspaceSettingSerializer,
    WorkspaceSettingsUpdateSerializer,
)


# ============================================================
# Workspace List
# ============================================================

class WorskspacesListAPIView(APIView):

    def get(self, request):

        try:

            result = WorkspaceService.get_workspaces_data(
                request.user
            )

            serializer = WorkspaceListSerializer(
                result["workspaces"],
                many=True
            )

            return Response({
                "summary": result["summary"],
                "workspaces": serializer.data
            })

        except Exception as e:
            print(type(e))
            print(e)
            raise


# ============================================================
# Create Workspace
# ============================================================

class CreateWorkspaceAPIView(APIView):

    def post(self, request):

        try:

            serializer = CreateWorkspaceSerializer(
                data=request.data
            )

            serializer.is_valid(
                raise_exception=True
            )

            result = WorkspaceService.create_workspace(
                user=request.user,
                validated_data=serializer.validated_data
            )

            return Response(
                CreateWorkspaceResponseSerializer(
                    result
                ).data
            )

        except Exception as e:
            print(type(e))
            print(e)
            raise


# ============================================================
# Workspace Layout / Detail
# ============================================================

class WorkspaceDetailAPIView(APIView):

    def get(self, request, workspace_id):

        try:

            result = WorkspaceService.workspace_layout_summary(
                user=request.user,
                workspace_id=workspace_id
            )

            serializer = WorkspaceLayoutSerializer(
                result
            )

            return Response(
                serializer.data
            )

        except Exception as e:
            print(type(e))
            print(e)
            raise

    def delete(self, request, workspace_id):

        try:

            result = WorkspaceService.delete_workspace(
                user=request.user,
                workspace_id=workspace_id
            )

            return Response(
                result,
                status=status.HTTP_200_OK
            )

        except Exception as e:
            print(type(e))
            print(e)
            raise


# ============================================================
# Workspace Overview
# ============================================================

class WorkspaceDetailOverviewAPIView(APIView):

    def get(self, request, workspace_id):

        try:

            # Check workspace access
            has_access = Workspace.objects.filter(
                id=workspace_id,
                members__user=request.user
            ).exists()

            if not has_access:
                raise PermissionDenied(
                    "You don't have permission to access this workspace."
                )

            summary = WorkspaceService.get_overview_summary(
                workspace_id
            )

            active_projects = WorkspaceService.get_active_projects(
                workspace_id
            )

            return Response({
                "summary": summary,
                "active_projects": (
                    WorkspaceOverviewAndProjectsSerializer(
                        active_projects,
                        many=True
                    ).data
                )
            })
        except Exception as e:
            print(type(e))
            print(e)
            raise


# ============================================================
# Workspace Projects
# ============================================================

class WorkspaceDetailProjectsAPIView(APIView):

    def get(self, request, workspace_id):

        try:

            result = WorkspaceService.get_projects_data(
                user=request.user,
                workspace_id=workspace_id
            )

            return Response({
                "summary": result["summary"],
                "projects": (
                    WorkspaceOverviewAndProjectsSerializer(
                        result["projects"],
                        many=True
                    ).data
                )
            })

        except Exception as e:
            print(type(e))
            print(e)
            raise


# ============================================================
# Workspace Members
# ============================================================

class WorkspaceDetailMembersAPIView(APIView):

    def get(self, request, workspace_id):

        try:

            result = WorkspaceMembersService.get_members_data(
                user=request.user,
                workspace_id=workspace_id
            )

            return Response({
                "summary": result["summary"],
                "members": (
                    WorkspaceMemberSerializer(
                        result["members"],
                        many=True,
                        context={
                            "request": request
                        }
                    ).data
                )
            })

        except Exception as e:
            print(type(e))
            print(e)
            raise


# ============================================================
# Invite Member
# ============================================================

class InviteMemberAPIView(APIView):

    def post(self, request, workspace_id):

        try:

            serializer = InviteMemberSerializer(
                data=request.data
            )

            serializer.is_valid(
                raise_exception=True
            )

            InvitationService.invite_member(
                user=request.user,
                workspace_id=workspace_id,
                validated_data=serializer.validated_data
            )

            return Response(
                {
                    "message": "Invitation sent successfully."
                },
                status=status.HTTP_200_OK
            )

        except Exception as e:
            print(type(e))
            print(e)
            raise


# ============================================================
# Accept Invitation
# ============================================================

class AcceptInvitationAPIView(APIView):

    permission_classes = [IsAuthenticated]

    def post(self, request, token):

        try:

            workspace = InvitationService.accept_invitation(
                user=request.user,
                token=token
            )

            return Response(
                {
                    "message": "Invitation accepted successfully.",
                    "workspace": {
                        "id": workspace.id,
                        "name": workspace.name,
                    },
                },
                status=status.HTTP_200_OK
            )

        except Exception as e:
            print(type(e))
            print(e)
            raise


# ============================================================
# Remove Member
# ============================================================

class RemoveMemberAPIView(APIView):

    def delete(
        self,
        request,
        workspace_id,
        user_id
    ):

        try:

            InvitationService.remove_member(
                user=request.user,
                workspace_id=workspace_id,
                target_user_id=user_id
            )

            return Response(
                {
                    "message": "Member removed successfully."
                },
                status=status.HTTP_200_OK
            )

        except Exception as e:
            print(type(e))
            print(e)
            raise


# ============================================================
# Leave Workspace
# ============================================================

class LeaveWorkspaceAPIView(APIView):

    permission_classes = [IsAuthenticated]

    def post(self, request, workspace_id):

        try:

            result = WorkspaceService.leave_workspace(
                user=request.user,
                workspace_id=workspace_id
            )

            return Response(
                result,
                status=status.HTTP_200_OK
            )

        except Exception as e:
            print(type(e))
            print(e)
            raise


# ============================================================
# Change Member Role
# ============================================================

class ChangeMemberRoleAPIView(APIView):

    def patch(
        self,
        request,
        workspace_id,
        user_id
    ):

        try:

            serializer = ChangeMemberRoleSerializer(
                data=request.data
            )

            serializer.is_valid(
                raise_exception=True
            )

            member = InvitationService.change_member_role(
                user=request.user,
                workspace_id=workspace_id,
                target_user_id=user_id,
                validated_data=serializer.validated_data
            )

            return Response(
                MemberRoleResponseSerializer(
                    member
                ).data,
                status=status.HTTP_200_OK
            )

        except Exception as e:
            print(type(e))
            print(e)
            raise


# ============================================================
# Workspace Settings (General + Preferences)
# ============================================================

class WorkspaceSettingsAPIView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request, workspace_id):

        try:

            result = WorkspaceService.get_workspace_settings(
                user=request.user,
                workspace_id=workspace_id
            )

            return Response({
                "role": result["role"],
                "general": WorkspaceGeneralSerializer(
                    result["workspace"]
                ).data,
                "preferences": WorkspaceSettingSerializer(
                    result["settings"]
                ).data,
            })

        except Exception as e:
            print(type(e))
            print(e)
            raise


class WorkspaceGeneralUpdateAPIView(APIView):

    permission_classes = [IsAuthenticated]

    def patch(self, request, workspace_id):

        try:

            serializer = WorkspaceGeneralUpdateSerializer(
                data=request.data,
                partial=True
            )

            serializer.is_valid(
                raise_exception=True
            )

            workspace = WorkspaceService.update_workspace_general(
                user=request.user,
                workspace_id=workspace_id,
                validated_data=serializer.validated_data
            )

            return Response(
                WorkspaceGeneralSerializer(
                    workspace
                ).data,
                status=status.HTTP_200_OK
            )

        except Exception as e:
            print(type(e))
            print(e)
            raise


class WorkspaceSettingsUpdateAPIView(APIView):

    permission_classes = [IsAuthenticated]

    def patch(self, request, workspace_id):

        try:

            serializer = WorkspaceSettingsUpdateSerializer(
                data=request.data,
                partial=True
            )

            serializer.is_valid(
                raise_exception=True
            )

            workspace_settings = WorkspaceService.update_workspace_settings(
                user=request.user,
                workspace_id=workspace_id,
                validated_data=serializer.validated_data
            )

            return Response(
                WorkspaceSettingSerializer(
                    workspace_settings
                ).data,
                status=status.HTTP_200_OK
            )

        except Exception as e:
            print(type(e))
            print(e)
            raise