from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from .services import ProjectsListService, NewProjectService, ProjectDetailService, ProjectOverviewService, ProjectTasksService
from .serializers import ProjectOverviewSerializer,ProjectDetailSerializer,ProjectListSerializer, CreateProjectSerializer, CreateProjectResponseSerializer
from .serializers import ProjectLogoUpdateSerializer
from rest_framework.response import Response
from .serializers import (
    ProjectMembersResponseSerializer,
    AvailableProjectMemberSerializer,
    AddProjectMembersSerializer,
)
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


class ProjectLogoUpdateAPIView(APIView):

    permission_classes = [IsAuthenticated]

    def patch(self, request, project_id):
        try:

            serializer = ProjectLogoUpdateSerializer(
                data=request.data
            )
            serializer.is_valid(raise_exception=True)

            ProjectDetailService.update_logo(
                user=request.user,
                project_id=project_id,
                logo_file=serializer.validated_data["logo"]
            )

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

    permission_classes = [IsAuthenticated]

    def get(self, request, project_id):

        response = ProjectMembersService.get_members(
            request.user,
            project_id
        )

        return Response(
            ProjectMembersResponseSerializer(response).data
        )

    def post(self, request, project_id):
        try:

            serializer = AddProjectMembersSerializer(
                data=request.data
            )
            serializer.is_valid(raise_exception=True)

            members = ProjectMembersService.add_members(
                user=request.user,
                project_id=project_id,
                members_data=serializer.validated_data["members"]
            )

            return Response(
                ProjectMembersResponseSerializer(
                    {"members": members}
                ).data
            )
        except Exception as e:
            print(type(e))
            print(e)
            raise


class AvailableProjectMembersAPIView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request, project_id):
        try:

            available_members = ProjectMembersService.get_available_members(
                request.user,
                project_id
            )

            return Response({
                "available_members": AvailableProjectMemberSerializer(
                    available_members,
                    many=True
                ).data
            })
        except Exception as e:
            print(type(e))
            print(e)
            raise

