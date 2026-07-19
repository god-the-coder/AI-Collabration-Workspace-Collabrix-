from django.urls import path

from api.v1.workspaces.views import (
    LeaveWorkspaceAPIView,
    WorkspaceSettingsUpdateAPIView,
)

app_name = "workspaces"

urlpatterns = [
    # POST /api/v1/workspaces/<workspace_id>/leave/
    path("<uuid:workspace_id>/leave/", LeaveWorkspaceAPIView.as_view(), name="workspace-leave"),

    # PUT /api/v1/workspaces/<workspace_id>/settings/
    path("<uuid:workspace_id>/settings/", WorkspaceSettingsUpdateAPIView.as_view(), name="workspace-settings-update"),
]
