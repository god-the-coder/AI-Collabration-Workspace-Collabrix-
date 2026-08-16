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