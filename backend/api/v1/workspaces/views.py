from rest_framework.views import APIView, Response
from .services import WorkspaceService, WorkspaceDetailSerivce
from .serializers import  WorkspaceMemberSerializer, WorkspaceOverviewAndProjectsSerializer,WorkspaceLayoutSerializer,WorkspaceListSerializer, CreateWorkspaceSerializer, CreateWorkspaceResponseSerializer
# from apps.accounts.models import UserModel



class WorskspacesListAPIView(APIView):

    def get(self, request):
       try: 
        result = WorkspaceService.get_workspaces_data(request.user)

        serializer = WorkspaceListSerializer(
            result["workspaces"],
            many=True
        )

        return Response ({
            "summary": result["summary"],
            "workspaces": serializer.data
        })
       except Exception as e:
          print(type(e))
          print(e)
          raise
 

class CreateWorkspaceAPIView(APIView):
   
   def post(self, request):
     try:
      
      
      serializer = CreateWorkspaceSerializer(
         data=request.data
        )
      serializer.is_valid(raise_exception=True)

      res = WorkspaceService.create_workspace(
         user=request.user,
         validated_data=serializer.validated_data
        )
      
      return Response(
         CreateWorkspaceResponseSerializer(res).data
      )
     except Exception as e:
       print(type(e))
       print(e)
       raise


class WorkspaceDetailAPIView(APIView):
  
  def get(self, request, workspace_id):
    try:
      resp = WorkspaceService.workspace_layout_summary(
        user=request.user, 
        workspace_id=workspace_id
      )

      serializer = WorkspaceLayoutSerializer(
         resp
      )

      return Response(serializer.data)
    except Exception as e:
      print(type(e))
      print(e)
      raise


class WorkspaceDetailOverviewAPIView(APIView):
  
  def get(self, request, workspace_id):
    try:
      resp=WorkspaceDetailSerivce.get_overview_data(
        user=request.user,
        workspace_id=workspace_id
      )

      return Response({
        "summary": resp["summary"],
        "active_projects": WorkspaceOverviewAndProjectsSerializer(resp["active_projects"], many=True).data
      })
    except Exception as e:
      print(type(e))
      print(e)
      raise
    

class WorkspaceDetailProjectsAPIView(APIView):

  def get(self, request, workspace_id):
    try:
      resp=WorkspaceDetailSerivce.get_projects_data(
        user=request.user,
        workspace_id=workspace_id
      )

      return Response({
        "summary": resp["summary"],
        "projects": WorkspaceOverviewAndProjectsSerializer(resp["projects"], many=True).data
      })
    except Exception as e:
      print(type(e))
      print(e)
      raise


class WorkspaceDetailMembersAPIView(APIView):

  def get(self, request, workspace_id):
      pass 

