import { create } from "zustand";
import { login as loginAPI, register as registerAPI} from "../api/auth.api";
import { data } from "react-router-dom";
import { User } from "lucide-react";


const useAuthStore = create((set) => ({
    // states
    user: null,
    isAuthenticated: false,
    isLoading: false,


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

    }


}));

export default useAuthStore;