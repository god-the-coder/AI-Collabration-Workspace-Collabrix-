from rest_framework.views import APIView, Response
from .services import WorkspaceService
from .serializers import WorkspaceListSerializer, CreateWorkspaceSerializer, CreateWorkspaceResponseSerializer
from apps.accounts.models import UserModel


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

   