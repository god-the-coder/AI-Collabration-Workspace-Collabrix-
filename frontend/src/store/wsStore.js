import { create } from "zustand";
// import api from "../api/axios";
import { globalWS } from "../api/workspace.api";


const useWorkSpaceStore = create((set) => ({

    workspaces: [],
    summary: null,
    isLoading: false,
    error: null,

    fetchWorkspaces: async () => {

        set({
            isLoading: true,
            error: null,
        });

        try {

            const resp = await globalWS();

            set({
                workspaces: resp.data.workspaces,
                summary: resp.data.summary,
            });

        } catch (error) {

            set({
                error: error.response?.data || error,
            });

            throw error;

        } finally {

            set({
                isLoading: false,
            });
        }
    },

}));


export default useWorkSpaceStore;