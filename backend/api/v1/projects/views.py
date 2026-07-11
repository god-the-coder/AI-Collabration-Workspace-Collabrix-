from rest_framework.views import APIView
from .services import ProjectsListService, NewProjectService
from .serializers import ProjectListSerializer, CreateProjectSerializer, CreateProjectResponseSerializer
from rest_framework.response import Response


class ProjectsListRetrieveAPIView(APIView):
    

    def get(self, request):
     try: 
        result = ProjectsListService.get_projects_data(request.user)

        serializer = ProjectListSerializer(
            result["projects"],
            many=True
        )

        return Response({
            "summary": result["summary"],
            "projects": serializer.data
        })
     except Exception as e:
        print(type(e))
        print(e)
        raise


class CreateProjectAPIView(APIView):
   
   def post(self, request):
     try:
      serializer = CreateProjectSerializer(data=request.data)
      serializer.is_valid(raise_exception=True)

      resp = NewProjectService.create_project(
         user=request.user,
         validated_data=serializer.validated_data 
        )
      
      return Response(
         CreateProjectResponseSerializer(resp).data
      )
     except Exception as e:
       print(type(e))
       print(e)
       raise

