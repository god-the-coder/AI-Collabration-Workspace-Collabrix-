from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import TasksListWrapperSerializer, CreateTaskResponseSerializer, CreateTaskSerializer
from .services import TasksListService, NewTaskService



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
       
class CreateTaskAPIView(APIView):
   
   def post(self, request):
     try:
      serializer=CreateTaskSerializer(data=request.data)
      serializer.is_valid(raise_exception=True)

      resp=NewTaskService.create_task(
         user=request.user,
         validated_data=serializer.validated_data
      )

      return Response(
         CreateTaskResponseSerializer(resp).data
      )
     except Exception as e:
       print(type(e))
       print(e)
       raise


