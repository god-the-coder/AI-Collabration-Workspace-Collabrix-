import api from "./axios";

export const globalWS = () => {
    return api.get("v1/workspaces/list/");
}