
import { Navigate } from "react-router-dom";
import type { ProtectedRouteProps } from "../types/user.type";
import { useAuthStore } from "../store/authstore";


const PrivateRouter = ({ children, }: ProtectedRouteProps) => {
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }
    

    return children;
};

export default PrivateRouter;