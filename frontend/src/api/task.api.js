import api from "./axios";

export const createTask = (workspaceId, data) => {
    return api.post(`v1/tasks/${workspaceId}/tasks/`, data);
};

export const getGlobalTasks = () => {
    return api.get("v1/tasks/global_tasks/");
};

export const getDetailedTask = (taskId) => {
    return api.get(`v1/tasks/detailed_task/${taskId}/`);
};


