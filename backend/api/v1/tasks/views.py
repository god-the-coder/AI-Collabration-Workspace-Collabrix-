from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import ValidationError, PermissionDenied

from api.v1.tasks.services import TaskActionService, TaskService
from api.v1.tasks.serializers import CreateTaskSerializer, CreateTaskResponseSerializer
from api.v1.projects.serializers import TaskCardSerializer

from api.v1.tasks.services import GlobalTaskService, TaskDetailService
from api.v1.tasks.serializers import GlobalTaskResponseSerializer, TaskDetailSerializer


class CompleteTaskAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, task_id):

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
    
        try:
            result = TaskActionService.delete_task(user=request.user, task_id=task_id)
            return Response(result, status=status.HTTP_200_OK)
        except PermissionDenied:
            raise
        except Exception:
            raise



class CreateTaskAPIView(APIView):


    permission_classes = [IsAuthenticated]

    def post(self, request, workspace_id):

        serializer = CreateTaskSerializer(
            data=request.data
        )

        serializer.is_valid(
            raise_exception=True
        )

        task = TaskService.create_task(
            user=request.user,
            workspace_id=workspace_id,
            validated_data=serializer.validated_data
        )

        return Response(
            CreateTaskResponseSerializer(task).data,
            status=status.HTTP_201_CREATED
        )



class GlobalTaskAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):

        try:
            data = GlobalTaskService.get_global_tasks(
                user=request.user
            )

            serializer = GlobalTaskResponseSerializer(data)

            return Response(
                serializer.data,
                status=status.HTTP_200_OK
            )

        except Exception:
            raise


class TaskDetailAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, task_id):
        task = TaskDetailService.get_task_detail(
            user=request.user,
            task_id=task_id,
        )

        serializer = TaskDetailSerializer(task)

        return Response(
            serializer.data,
            status=status.HTTP_200_OK,
        )

