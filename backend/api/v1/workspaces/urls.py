from django.urls import path 
from .views import WorskspacesListAPIView, CreateWorkspaceAPIView, WorkspaceDetailAPIView

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
    )
]
