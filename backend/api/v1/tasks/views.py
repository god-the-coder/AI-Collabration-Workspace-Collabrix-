from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import ValidationError, PermissionDenied

from api.v1.tasks.services import TaskActionService
from api.v1.projects.serializers import TaskCardSerializer


class CompleteTaskAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, task_id):
        """
        Mark the specified task as completed.
        """
        try:
            task = TaskActionService.complete_task(user=request.user, task_id=task_id)

            # return updated task using TaskCardSerializer
            serializer = TaskCardSerializer(task)

            return Response(serializer.data, status=status.HTTP_200_OK)
        except ValidationError:
            raise
        except PermissionDenied:
            raise
        except Exception:
            raise


class DeleteTaskAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request, task_id):
        """
        Delete the specified task.
        """
        try:
            result = TaskActionService.delete_task(user=request.user, task_id=task_id)
            return Response(result, status=status.HTTP_200_OK)
        except PermissionDenied:
            raise
        except Exception:
            raise
