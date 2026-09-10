from rest_framework.urls import path
from .views import (
    NotificationListAPIView,
    NotificationMarkReadAPIView,
    NotificationMarkAllReadAPIView,
)

urlpatterns = [
    path(
        "all/",
        NotificationListAPIView.as_view()
    ),
    path(
        "mark-all-read/",
        NotificationMarkAllReadAPIView.as_view()
    ),
    path(
        "<uuid:notification_id>/read/",
        NotificationMarkReadAPIView.as_view()
    ),
]
