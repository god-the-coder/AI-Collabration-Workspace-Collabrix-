import { Navigate } from "react-router-dom";

export default function GuestRoute({children}) {

    const isAuthenticated = false;

    return (
        isAuthenticated?
        children:<Navigate to="/" replace />
    )

}