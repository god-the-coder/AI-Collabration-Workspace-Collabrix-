import { create } from "zustand";
import { login as loginAPI, register as registerAPI, getCurrentUserAPI} from "../api/auth.api";
import { data } from "react-router-dom";
import { User } from "lucide-react";


const useAuthStore = create((set) => ({
    // states
    user: null,
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


    fetchCurrentUser: async () => {
        try {
            const resp = await getCurrentUserAPI();

            set({
                user: resp.data.profile,
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