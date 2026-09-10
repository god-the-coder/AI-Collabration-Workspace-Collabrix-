from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status

from api.v1.notifications.services import NotificationService
from api.v1.notifications.serializers import NotificationListSerializer, NotificationSerializer


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


class NotificationMarkReadAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, notification_id):
        notification = NotificationService.mark_as_read(
            user=request.user,
            notification_id=notification_id,
        )

        serializer = NotificationSerializer(notification)

        return Response(
            serializer.data,
            status=status.HTTP_200_OK,
        )


class NotificationMarkAllReadAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        data = NotificationService.mark_all_as_read(user=request.user)

        return Response(
            data,
            status=status.HTTP_200_OK,
        )


