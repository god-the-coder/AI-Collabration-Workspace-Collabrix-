from rest_framework.views import APIView
from .services import ProjectsListService, NewProjectService, ProjectDetailService, ProjectOverviewService, ProjectTasksService
from .serializers import ProjectOverviewSerializer,ProjectDetailSerializer,ProjectListSerializer, CreateProjectSerializer, CreateProjectResponseSerializer
from rest_framework.response import Response
from .serializers import ProjectMembersResponseSerializer
from .services import ProjectMembersService


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


class ProjectDetailAPIView(APIView):
    def get(self, request, project_id):
     try:
        project = ProjectDetailService.get_project(
            project_id,
            request.user
        )

        return Response(
            ProjectDetailSerializer(project).data
        )
     except Exception as e:
      print(type(e))
      print(e)
      raise


class ProjectOverviewAPIView(APIView):

    def get(self, request, project_id):

        project = ProjectOverviewService.get_overview(
            request.user,
            project_id
        )

        return Response(
            ProjectOverviewSerializer(project).data
        )
    

class ProjectTasksAPIView(APIView):

    def get(self, request, project_id):
      try:

        response = ProjectTasksService.get_project_tasks(
            request.user,
            project_id
        )

        return Response(response)
      except Exception as e:
         print(type(e))
         print(e)
         raise


class ProjectMembersAPIView(APIView):

    def get(self, request, project_id):

        response = ProjectMembersService.get_members(
            request.user,
            project_id
        )

        return Response(
            ProjectMembersResponseSerializer(response).data
        )

