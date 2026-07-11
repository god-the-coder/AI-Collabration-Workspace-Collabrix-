from django.urls import path
from .views import TasksListRetrieveAPIView, CreateTaskAPIView


urlpatterns = [
    path(
        "list/",
        TasksListRetrieveAPIView.as_view()
    ),

    path(
        "create/",
        CreateTaskAPIView.as_view()
    ),
]
