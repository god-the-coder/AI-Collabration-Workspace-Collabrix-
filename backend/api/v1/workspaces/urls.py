from django.urls import path 
from .views import  WorkspaceDetailMembersAPIView, WorkspaceDetailProjectsAPIView, WorskspacesListAPIView, CreateWorkspaceAPIView, WorkspaceDetailAPIView, WorkspaceDetailOverviewAPIView, InviteMemberAPIView, AcceptInvitationAPIView, RemoveMemberAPIView, ChangeMemberRoleAPIView

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

    path(
        "<uuid:workspace_id>/invite/",
        InviteMemberAPIView.as_view()
    ),

    path(
        "invitations/<uuid:token>/accept/",
        AcceptInvitationAPIView.as_view()
    ),

    path(
        "<uuid:workspace_id>/members/<uuid:user_id>/",
        RemoveMemberAPIView.as_view()
    ),

    path(
        "<uuid:workspace_id>/members/<uuid:user_id>/role/",
        ChangeMemberRoleAPIView.as_view()
    ),

    # path(
    #     "<uuid:workspace_id>/settings/",
    # )
]
