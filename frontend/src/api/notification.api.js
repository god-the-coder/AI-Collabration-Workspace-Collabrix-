import api from "./axios";

export const getNotifications = () => {
    return api.get("v1/notifications/all/");
};

export const markNotificationRead = (notificationId) => {
    return api.post(`v1/notifications/${notificationId}/read/`);
};

export const markAllNotificationsRead = () => {
    return api.post("v1/notifications/mark-all-read/");
};
