from rest_framework.urls import path
from .views import NotificationListAPIView
urlpatterns = [
    path(
        "all/",
        NotificationListAPIView.as_view()
    )
]
