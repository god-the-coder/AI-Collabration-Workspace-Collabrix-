from django.urls import path
from .views import TasksListRetrieveAPIView


urlpatterns = [
    path(
        "list/",
        TasksListRetrieveAPIView.as_view()
    )
]
