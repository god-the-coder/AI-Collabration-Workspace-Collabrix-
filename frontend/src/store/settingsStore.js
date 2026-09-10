import { create } from "zustand";
import {
    getSettingsWS,
    updateProfileWS,
    updateAppearanceWS,
    updateNotificationsWS,
    updatePasswordWS,
    deleteAccountWS,
    revokeAllSessionsWS,
} from "../api/settings.api";
import { applyTheme } from "../utils/theme";

const useSettingsStore = create((set, get) => ({
    profile: null,
    appearance: null,
    notifications: null,
    security: null,
    activeSessions: [],

    isLoading: false,
    isLoaded: false,
    error: null,

    fetchSettings: async () => {
        set({ isLoading: true, error: null });

        try {
            const resp = await getSettingsWS();

            set({
                profile: resp.data.profile,
                appearance: resp.data.appearance,
                notifications: resp.data.notifications,
                security: resp.data.security,
                activeSessions: resp.data.active_sessions,
                isLoaded: true,
            });

            applyTheme(resp.data.appearance?.theme || "SYSTEM");

            return resp.data;
        } catch (error) {
            set({ error: error.response?.data || error });
            throw error;
        } finally {
            set({ isLoading: false });
        }
    },

    updateProfile: async (data) => {
        const resp = await updateProfileWS(data);
        set({ profile: { ...get().profile, ...resp.data } });
        return resp.data;
    },

    updateAppearance: async (theme) => {
        // Optimistic: apply immediately, persist, roll back on failure.
        const previous = get().appearance;
        applyTheme(theme);
        set({ appearance: { theme } });

        try {
            const resp = await updateAppearanceWS(theme);
            set({ appearance: resp.data });
            return resp.data;
        } catch (error) {
            set({ appearance: previous });
            applyTheme(previous?.theme || "SYSTEM");
            throw error;
        }
    },

    updateNotifications: async (field, value) => {
        const previous = get().notifications;
        set({ notifications: { ...previous, [field]: value } });

        try {
            const resp = await updateNotificationsWS({ [field]: value });
            set({ notifications: { ...get().notifications, ...resp.data } });
            return resp.data;
        } catch (error) {
            set({ notifications: previous });
            throw error;
        }
    },

    updatePassword: async (data) => {
        return updatePasswordWS(data);
    },

    deleteAccount: async (password) => {
        return deleteAccountWS(password);
    },

    revokeAllOtherSessions: async () => {
        await revokeAllSessionsWS();
        await get().fetchSettings();
    },
}));

export default useSettingsStore;
