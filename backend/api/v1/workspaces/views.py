from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import PermissionDenied

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

    def post(self, request, token):

        try:

            InvitationService.accept_invitation(
                user=request.user,
                token=token
            )

            return Response(
                {
                    "message": "Invitation accepted successfully."
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