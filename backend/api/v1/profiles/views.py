from rest_framework.views import APIView
from .services import ProfilePageService
from rest_framework.response import Response
from .serializers import ProfileSerializer, ProfileAboutSerializer, ProfileContactSerializer, ProfileWorkspaceSerializer, ProfileProjectsSerializer
from rest_framework.permissions import IsAuthenticated


class ProfilePageAPIView(APIView):

   permission_classes = [IsAuthenticated]   
  
   def get(self, request):
      
     try:
      user = request.user
      result = ProfilePageService.get_profile_data(user)

      return Response({
         "profile": ProfileSerializer(result["profile"]).data,
         "summary": result["summary"],
         "about": ProfileAboutSerializer(result["about"]).data,
         "contact": ProfileContactSerializer(result["contact"]).data,
         "workspaces": ProfileWorkspaceSerializer(result["workspaces"], many=True).data,
         "active_projects": ProfileProjectsSerializer(result["active_projects"], many=True).data
      })
     
     except Exception as e:
       print(type(e))
       print(e)
       raise
    