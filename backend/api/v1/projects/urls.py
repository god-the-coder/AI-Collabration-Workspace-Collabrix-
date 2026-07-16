from django.urls import path
from .views import ProjectsListRetrieveAPIView, CreateProjectAPIView, ProjectDetailAPIView

urlpatterns = [
    path(
        "list/",
        ProjectsListRetrieveAPIView.as_view()
    ),

    path(
        "create/",
        CreateProjectAPIView.as_view()
    ),

    path(
        "<uuid:project_id>/",
        ProjectDetailAPIView.as_view()
    ),

    # path(
    #     "<uuid:project_id>/tasks/",
    #     .as_view()
    # ),

    # path(
    #     "<uuid:project_id>/members/", 
    #     .as_view()
    # )
]
