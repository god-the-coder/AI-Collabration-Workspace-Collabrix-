import { create } from "zustand";


const useUIStore = create((set) => ({

    sidebarOpen : false,

    openSidebar : () => set({
        sidebarOpen : true
    }),

    closeSidebar : () => {
        sidebarOpen : false;
    },

    toggleSidebar : () => set((state) => ({
        sidebarOpen: !state.sidebarOpen, 
    })),

}));


export default useUIStore;