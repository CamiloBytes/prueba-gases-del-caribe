

import { Navigate } from "react-router-dom";
import type { PublicRouteProps } from "../types/user.type";
import { useAuthStore } from "../store/authstore";


const PublicRoute = ({ children }: PublicRouteProps) => {
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

    if (isAuthenticated) {
        return <Navigate to="/dashboard" replace />;
    }

    return <>{children}</>;
};

export default PublicRoute;