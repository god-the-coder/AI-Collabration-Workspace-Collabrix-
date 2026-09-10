from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .services import SettingServices
from .serializers import ProfileSerializer, AppearanceSerializer, NotificationSerializer, SessionSerializer
from .serializers import UpdateProfileSerializer,  UpdateProfileResponseSerializer
from .serializers import AppearanceSerializer, UpdateAppearanceResponseSerializer
from .serializers import NotificationSerializer, UpdateNotificationResponseSerializer
from .services import SettingPatchServices
from .serializers import UpdatePasswordSerializer, UpdatePasswordSerializerResponse
from .serializers import DeleteSerializer


def get_current_session_id(request):
    return request.auth.get("session_id") if request.auth else None


class SettingsAPIView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request):
       try:
        data = SettingServices.get_settings_data(request.user)

        current_session_id = get_current_session_id(request)

        return Response({
            "profile": ProfileSerializer(data["profile"]).data,
            "appearance": AppearanceSerializer(data["appearance"]).data,
            "notifications": NotificationSerializer(data["notifications"]).data,
            "security": data["security"],
            "active_sessions": SessionSerializer(
                data["active_sessions"],
                many=True,
                context={"current_session_id": current_session_id}
            ).data
            })
       except Exception as e:
          print(type(e))
          print(e)
          raise


class SettingsProfileAPIView(APIView):

   permission_classes = [IsAuthenticated]

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

  permission_classes = [IsAuthenticated]

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

  permission_classes = [IsAuthenticated]

  def patch(self, request):
   try:
    serializer = NotificationSerializer(data=request.data, partial=True)
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

  permission_classes = [IsAuthenticated]

  def patch(self, request):
   try:
    serializer = UpdatePasswordSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)

    resp = SettingPatchServices.patch_password(request, serializer.validated_data)

    return Response(
      UpdatePasswordSerializerResponse(resp).data
    )
   except Exception as e:
     print(type(e))
     print(e)
     raise


class SettingsDeleteAPIView(APIView):

  permission_classes = [IsAuthenticated]

  def delete(self, request):
   try:
    serializer = DeleteSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)

    SettingPatchServices.delete_account(request.user ,serializer.validated_data)

    return Response({
      "message": "User account deleted successfully"
    })
   except Exception as e:
     print(type(e))
     print(e)
     raise


class SettingsRevokeAllAPIView(APIView):

  permission_classes = [IsAuthenticated]

  def post(self, request):
    SettingPatchServices.revoke_all_sessions(
      request.user,
      exclude_session_id=get_current_session_id(request)
    )

    return Response({
      "message": "All other sessions signed out successfully"
    })

class SettingsRevokeAPIView(APIView):

  permission_classes = [IsAuthenticated]

  def post(self, request, session_id):
   try:

    SettingPatchServices.revoke_sessions(
      user=request.user,
      session_id=session_id
    )

    return Response({
      "message": "Session signed out successfully"
    })

   except Exception as e:
     print(type(e))
     print(e)
     raise
