from rest_framework.views import APIView
from .services import NotifiationService
from .serializers import NotificationSerializer
from rest_framework.response import Response


class NotificationsRetrieveAPIView(APIView):
    

    def get(self, request):
        notifications = NotifiationService.get_all_notification(request.user)
        unread_count = NotifiationService.get_unread_count(request.user)
        

        serializer = NotificationSerializer(
            notifications,
            many=True
        )

        return Response({
            "unread_count": unread_count,
            "notifications": serializer.data
          }
        )


