import { Navigate } from "react-router-dom";
import useAuthStore from "../store/authStore";

export default function ProtectedRoute({children}) {

    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
    const isInitializing = useAuthStore((state) => state.isInitializing);

    if (isInitializing) {
        return null;
    }

    return isAuthenticated?
    children:<Navigate to="/login" replace/>;

}

