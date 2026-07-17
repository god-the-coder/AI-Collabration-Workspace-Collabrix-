from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status

from api.v1.notifications.services import NotificationService
from api.v1.notifications.serializers import NotificationListSerializer


class NotificationListAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
     try:
        data = NotificationService.get_notifications(request.user)

        serializer = NotificationListSerializer(data)

        return Response(
            serializer.data,
            status=status.HTTP_200_OK
        )
     except Exception as e:
        print(type(e))
        print(e)
        raise


