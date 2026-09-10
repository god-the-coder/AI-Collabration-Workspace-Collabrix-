import api from "./axios";

export const globalWS = () => {
    return api.get("v1/workspaces/list/");
}

export const createWS = (data) => {
    return api.post("v1/workspaces/create/", data)
}

export const localWS = (workspaceId) => {
    return api.get(`v1/workspaces/${workspaceId}/`)
}

export const overviewWS = (workspaceId) => {
    return api.get(`v1/workspaces/${workspaceId}/overview/`)
}

export const projectWS = (workspaceId) => {
    return api.get(`v1/workspaces/${workspaceId}/projects/`)
}

export const membersWS = (workspaceId) => {
    return api.get(`v1/workspaces/${workspaceId}/members/`);
}

export const inviteMemberWS = (workspaceId, data) => {
    return api.post(`v1/workspaces/${workspaceId}/invite/`, data);
}

export const acceptInvitationWS = (token) => {
    return api.post(`v1/workspaces/invitations/${token}/accept/`);
}

export const removeMemberWS = (workspaceId, userId) => {
    return api.delete(`v1/workspaces/${workspaceId}/members/${userId}/`);
}

export const changeMemberRoleWS = (workspaceId, userId, role) => {
    return api.patch(`v1/workspaces/${workspaceId}/members/${userId}/role/`, { role });
}

export const leaveWorkspaceWS = (workspaceId) => {
    return api.post(`v1/workspaces/${workspaceId}/leave/`);
}

export const getWorkspaceSettingsWS = (workspaceId) => {
    return api.get(`v1/workspaces/${workspaceId}/settings/`);
}

// data may include a `logo` File — sent as multipart/form-data when present.
export const updateWorkspaceGeneralWS = (workspaceId, data) => {
    const hasFile = data?.logo instanceof File;

    if (!hasFile) {
        return api.patch(`v1/workspaces/${workspaceId}/settings/general/`, data);
    }

    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
            formData.append(key, value);
        }
    });

    return api.patch(`v1/workspaces/${workspaceId}/settings/general/`, formData, {
        headers: { "Content-Type": undefined },
    });
}

export const updateWorkspacePreferencesWS = (workspaceId, data) => {
    return api.patch(`v1/workspaces/${workspaceId}/settings/preferences/`, data);
}

export const deleteWorkspaceWS = (workspaceId) => {
    return api.delete(`v1/workspaces/${workspaceId}/`);
}