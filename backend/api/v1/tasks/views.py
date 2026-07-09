from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import TasksListWrapperSerializer
from .services import TasksListService



class TasksListRetrieveAPIView(APIView):

    def get(self, request):
       try: 
        result = TasksListService.get_tasks_data(request.user)

        serializer = TasksListWrapperSerializer(result["tasks"])

        return Response({
            "summary": result["summary"],
            "tasks": serializer.data
        })
       except Exception as e:
          print(type(e))
          print(e)
          raise