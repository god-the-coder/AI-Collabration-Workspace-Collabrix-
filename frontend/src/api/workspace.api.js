import api from "./axios";

export const globalWS = () => {
    return api.get("v1/workspaces/list/");
}

export const createWS = (data) => {
    return api.post("v1/workspaces/create/", data)
}