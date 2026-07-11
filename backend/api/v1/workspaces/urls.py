from django.urls import path 
from .views import WorskspacesListAPIView, CreateWorkspaceAPIView

urlpatterns = [
    path(
        "list/",
        WorskspacesListAPIView.as_view(),
        name="all_user_workspaces"
    ),

    path(
        "create/",
        CreateWorkspaceAPIView.as_view()
    )
]
