from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import ValidationError, PermissionDenied

from api.v1.workspaces.services import WorkspaceService
from api.v1.workspaces.serializers import WorkspaceSettingsUpdateSerializer, WorkspaceSettingSerializer


class LeaveWorkspaceAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, workspace_id):
        """
        Authenticated user leaves a workspace.
        """
        try:
            result = WorkspaceService.leave_workspace(
                user=request.user,
                workspace_id=workspace_id
            )
            return Response(result, status=status.HTTP_200_OK)
        except ValidationError as e:
            raise
        except PermissionDenied:
            raise
        except Exception as e:
            # Bubble up for higher-level handlers / logging
            raise


class WorkspaceSettingsUpdateAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def put(self, request, workspace_id):
        """
        Update allowed workspace settings.
        Only owner may perform this action.
        """
        serializer = WorkspaceSettingsUpdateSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        try:
            setting = WorkspaceService.update_workspace_settings(
                user=request.user,
                workspace_id=workspace_id,
                validated_data=serializer.validated_data
            )

            response_serializer = WorkspaceSettingSerializer(setting)

            return Response(response_serializer.data, status=status.HTTP_200_OK)
        except PermissionDenied:
            raise
        except Exception:
            raise
