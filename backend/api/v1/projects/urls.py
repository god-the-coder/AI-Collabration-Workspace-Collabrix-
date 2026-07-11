from django.urls import path
from .views import ProjectsListRetrieveAPIView, CreateProjectAPIView

urlpatterns = [
    path(
        "list/",
        ProjectsListRetrieveAPIView.as_view()
    ),

    path(
        "create/",
        CreateProjectAPIView.as_view()
    ),
]
