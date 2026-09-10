import api from "./axios";

export const getSettingsWS = () => api.get("v1/settings/me/");

// data may include an `avatar` File — sent as multipart/form-data when present.
export const updateProfileWS = (data) => {
    const hasFile = data?.avatar instanceof File;

    if (!hasFile) {
        return api.patch("v1/settings/profile/", data);
    }

    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
            formData.append(key, value);
        }
    });

    return api.patch("v1/settings/profile/", formData, {
        headers: { "Content-Type": undefined },
    });
};

export const updateAppearanceWS = (theme) => api.patch("v1/settings/appearance/", { theme });

export const updateNotificationsWS = (data) => api.patch("v1/settings/notification/", data);

export const updatePasswordWS = (data) => api.patch("v1/settings/password/", data);

export const deleteAccountWS = (password) => api.delete("v1/settings/delete/", { data: { password } });

export const revokeAllSessionsWS = () => api.post("v1/settings/all-logout/");
