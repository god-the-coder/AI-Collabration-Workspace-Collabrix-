from django.urls import path 
from .views import  WorkspaceDetailMembersAPIView, WorkspaceDetailProjectsAPIView, WorskspacesListAPIView, CreateWorkspaceAPIView, WorkspaceDetailAPIView, WorkspaceDetailOverviewAPIView

urlpatterns = [
    path(
        "list/",
        WorskspacesListAPIView.as_view(),
        name="all_user_workspaces"
    ),

    path(
        "create/",
        CreateWorkspaceAPIView.as_view()
    ),

    path(
        "<uuid:workspace_id>/",
        WorkspaceDetailAPIView.as_view()
    ),

    path(
        "<uuid:workspace_id>/overview/",
        WorkspaceDetailOverviewAPIView.as_view()
    ),

    path(
        "<uuid:workspace_id>/projects/",
        WorkspaceDetailProjectsAPIView.as_view()
    ),

    path(
        "<uuid:workspace_id>/members/",
        WorkspaceDetailMembersAPIView.as_view()
    ),

    # path(
    #     "<uuid:workspace_id>/settings/",
    # )
]
