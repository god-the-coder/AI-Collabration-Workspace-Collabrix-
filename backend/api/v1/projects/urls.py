from django.urls import path
from .views import ProjectsListRetrieveAPIView, CreateProjectAPIView, ProjectDetailAPIView, ProjectOverviewAPIView

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

    path(
        "<uuid:project_id>/overview/",
        ProjectOverviewAPIView.as_view()
    ),

    # path("<uuid:project_id>/tasks/", .as_view(), name="")

    # path(
    #     "<uuid:project_id>/members/", 
    #     .as_view()
    # )
]
