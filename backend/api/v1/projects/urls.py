from django.urls import path
from .views import ProjectsListRetrieveAPIView, CreateProjectAPIView, ProjectDetailAPIView, ProjectOverviewAPIView
from .views import ProjectTasksAPIView, ProjectMembersAPIView

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

    path(
        "<uuid:project_id>/tasks/", 
        ProjectTasksAPIView.as_view()
    ),

    path(
        "<uuid:project_id>/members/", 
        ProjectMembersAPIView.as_view()
    )
]
