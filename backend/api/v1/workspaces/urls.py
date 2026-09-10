from django.urls import path

from .views import (
    WorkspaceDetailMembersAPIView,
    WorkspaceDetailProjectsAPIView,
    WorskspacesListAPIView,
    CreateWorkspaceAPIView,
    WorkspaceDetailAPIView,
    WorkspaceDetailOverviewAPIView,
    InviteMemberAPIView,
    AcceptInvitationAPIView,
    RemoveMemberAPIView,
    ChangeMemberRoleAPIView,
    LeaveWorkspaceAPIView,
    WorkspaceSettingsAPIView,
    WorkspaceGeneralUpdateAPIView,
    WorkspaceSettingsUpdateAPIView,
)


urlpatterns = [


    path(
        "list/",
        WorskspacesListAPIView.as_view(),
        name="all_user_workspaces",
    ),

    path(
        "create/",
        CreateWorkspaceAPIView.as_view(),
        name="create_workspace",
    ),



    path(
        "<uuid:workspace_id>/",
        WorkspaceDetailAPIView.as_view(),
        name="workspace_detail",
    ),

    path(
        "<uuid:workspace_id>/overview/",
        WorkspaceDetailOverviewAPIView.as_view(),
        name="workspace_overview",
    ),

    path(
        "<uuid:workspace_id>/projects/",
        WorkspaceDetailProjectsAPIView.as_view(),
        name="workspace_projects",
    ),

    path(
        "<uuid:workspace_id>/members/",
        WorkspaceDetailMembersAPIView.as_view(),
        name="workspace_members",
    ),

    path(
        "<uuid:workspace_id>/leave/",
        LeaveWorkspaceAPIView.as_view(),
        name="leave_workspace",
    ),


    path(
        "<uuid:workspace_id>/invite/",
        InviteMemberAPIView.as_view(),
        name="invite_member",
    ),

    path(
        "invitations/<uuid:token>/accept/",
        AcceptInvitationAPIView.as_view(),
        name="accept_invitation",
    ),


    path(
        "<uuid:workspace_id>/members/<uuid:user_id>/",
        RemoveMemberAPIView.as_view(),
        name="remove_member",
    ),

    path(
        "<uuid:workspace_id>/members/<uuid:user_id>/role/",
        ChangeMemberRoleAPIView.as_view(),
        name="change_member_role",
    ),

    path(
        "<uuid:workspace_id>/settings/",
        WorkspaceSettingsAPIView.as_view(),
        name="workspace_settings",
    ),

    path(
        "<uuid:workspace_id>/settings/general/",
        WorkspaceGeneralUpdateAPIView.as_view(),
        name="workspace_settings_general",
    ),

    path(
        "<uuid:workspace_id>/settings/preferences/",
        WorkspaceSettingsUpdateAPIView.as_view(),
        name="workspace_settings_preferences",
    ),
]