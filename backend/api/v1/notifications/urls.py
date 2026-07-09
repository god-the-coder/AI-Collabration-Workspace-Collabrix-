from rest_framework.urls import path
from .views import NotificationsRetrieveAPIView
urlpatterns = [
    path(
        "all/",
        NotificationsRetrieveAPIView.as_view()
    )
]
