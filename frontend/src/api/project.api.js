import api from "./axios";


export const createProject = (data) => {
    return api.post("v1/projects/create/", data);
}