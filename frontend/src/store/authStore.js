import { create } from "zustand";
import { login as loginAPI, register as registerAPI, getCurrentUserAPI, logout as logoutAPI} from "../api/auth.api";
import { data } from "react-router-dom";
import { User } from "lucide-react";


const useAuthStore = create((set) => ({
    // states
    user: null,
    profileData: null,
    isAuthenticated: false,
    isLoading: false,
    isInitializing: true,


    // actions
    register: async(data) => {
        set({isLoading: true});

        try {
            const resp = await registerAPI(data);
            return resp.data;
        }
        catch(error) {
            throw error.response?.data || error;
        }
        finally {
            set({isLoading: false});
        }
    },


    login: async(data) => {
        set({isLoading: true});

        try {
            const resp = await loginAPI(data);

            set({
                user: resp.data.user,
                isAuthenticated: true
            })
            return resp.data;
        }
        catch(error) {
            throw error.response?.data || error;
        }
        finally {
            set({isLoading: false});
        }

    },


    logout: async () => {
        try {
            await logoutAPI();
        }
        catch (error) {
            // Even if the request fails, clear local auth state so the
            // user isn't stuck "logged in" on a dead session.
        }
        finally {
            set({
                user: null,
                profileData: null,
                isAuthenticated: false
            });
        }
    },


    fetchCurrentUser: async () => {
        try {
            const resp = await getCurrentUserAPI();

            // console.log(resp.data);

            set({
                user: resp.data.profile,
                profileData: resp.data,
                isAuthenticated: true
            })
        }
        catch (error) {
            set({
                user: null,
                isAuthenticated: false
            });
        }
        finally {
            set(
                {isInitializing: false}
            );
        }
    }


}));

export default useAuthStore;