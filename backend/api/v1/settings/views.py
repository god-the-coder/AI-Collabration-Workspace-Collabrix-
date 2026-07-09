from rest_framework.views import APIView
from rest_framework.response import Response
from .services import SettingServices
from .serializers import ProfileSerializer, AppearanceSerializer, NotificationSerializer, SessionSerializer
from .serializers import UpdateProfileSerializer,  UpdateProfileResponseSerializer
from .serializers import AppearanceSerializer, UpdateAppearanceResponseSerializer
from .serializers import NotificationSerializer, UpdateNotificationResponseSerializer
from .services import SettingPatchServices
from .serializers import UpdatePasswordSerializer, UpdatePasswordSerializerResponse
from .serializers import DeleteSerializer


class SettingsAPIView(APIView):

    def get(self, request):
       try: 
        data = SettingServices.get_settings_data(request.user)

        # current_session = SettingServices.get_current_session(request)

        return Response({
            "profile": ProfileSerializer(data["profile"]).data,
            "appearance": AppearanceSerializer(data["appearance"]).data,
            "notifications": NotificationSerializer(data["notifications"]).data,
            "security": data["security"],
            "active_sessions": SessionSerializer(data["active_sessions"], many=True).data
            })
       except Exception as e:
          print(type(e))
          print(e)
          raise
       

class SettingsProfileAPIView(APIView):
   
   def patch(self, request):
     try: 
      serializer = UpdateProfileSerializer(
         data=request.data,
         partial=True,
         context={"request": request}
      )

      serializer.is_valid(raise_exception=True)

      user = SettingPatchServices.patch_user_profile(
         request,
         serializer.validated_data
      )

      return Response(
         UpdateProfileResponseSerializer(user).data
      )
     except Exception as e:
       print(type(e))
       print(e)
       raise


class SettingsAppearanceAPIView(APIView):
  
  def patch(self, request):
   try: 
    serializer = AppearanceSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)

    resp = SettingPatchServices.patch_apprearance(request, serializer.validated_data)

    return Response(
      UpdateAppearanceResponseSerializer(resp).data
    )
   except Exception as e:
     print(type(e))
     print(e)
     raise
  

class SettingsNotificationAPIView(APIView):
  
  def patch(self, request):
   try:
    serializer = NotificationSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)

    resp = SettingPatchServices.patch_notification(request.user, serializer.validated_data)

    return Response(
      UpdateNotificationResponseSerializer(resp).data
    )
   except Exception as e:
     print(type(e))
     print(e)
     raise



class SettingsPasswordAPIView(APIView):
  
  def patch(self, request):
    
    serializer = UpdatePasswordSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)

    resp = SettingPatchServices.patch_password(request, serializer.validated_data)

    return Response(
      UpdatePasswordSerializerResponse(resp).data
    )


class SettingsDeleteAPIView(APIView):
  
  def delete(self, request):
   try:
    serializer = DeleteSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)

    SettingPatchServices.delete_account(request.user ,serializer.validated_data)

    return Response({
      "user account deleted succesfully"
    })
   except Exception as e:
     print(type(e))
     print(e)
     raise


class SettingsRevokeAllAPIView(APIView):

  def post(self, request):
    SettingPatchServices.revoke_all_sessions(
      request.user
    )

    return Response({
      "All sessions revoked successfully"
    })
  
class SettingsRevokeAPIView(APIView):

  def post(self, request):
   try:
    
    SettingPatchServices.revoke_sessions(
      user=request.user,
      session_id=request.auth["session_id"]
    )

    return Response({
      "message": "logged out successfully"
    })
   
   except Exception as e:
     print(type(e))
     print(e)
     raise
    


