import api from "./axios";

export const createTask = (ws_id) => {
    return api.post(`v1/${ws_id}/tasks/`)
}

export const getGlobalTasks = () => {
    return api.get("v1/tasks/global_tasks/");
};

export const getDetailedTask = (taskId) => {
    return api.get(`v1/tasks/detailed_task/${taskId}/`);
};


