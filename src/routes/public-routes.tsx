import {  UserContext } from "@/context/user-context";
import type { IUserContext } from "@/context/user-context";
import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";

// Inteface for Props
interface PropsType {
    allowedRole: string;
}

// UnProtected Route
function PublicRoutes({ allowedRole }: PropsType) {
    const userContext = useContext(UserContext) as IUserContext;
    const { isAuth, user } = userContext;

    // Check auth and role
    if (isAuth && user?.role === allowedRole) {
        return <Navigate to={`/${allowedRole}/dashboard`} />;
    }

    return <Outlet />;
}

// Export UnProtected Route
export default PublicRoutes;