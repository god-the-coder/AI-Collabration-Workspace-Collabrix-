import { Navigate } from "react-router-dom";

function GuestRoute({children}) {

    const isAuthenticated = false;

    return (
        isAuthenticated?
        children:<Navigate to="/" replace />
    )

}