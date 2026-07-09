from rest_framework.views import APIView, Response
from .services import WorkspaceService
from .serializers import WorkspaceListSerializer
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
     