import api from "./axios";


export const globalProjects = () => {
    return api.get("v1/projects/list/");
};

export const createProject = (data) => {
    return api.post("v1/projects/create/", data);
}

export const detailedProject = (projectId) => {
    return api.get(`v1/projects/${projectId}/`);
}

export const projectOverview = (projectId) => {
    return api.get(`v1/projects/${projectId}/overview/`);
}

export const projectTasks = (projectId) => {
    return api.get(`v1/projects/${projectId}/tasks/`);
}

export const projectMembers = (projectId) => {
    return api.get(`v1/projects/${projectId}/members/`);
}
