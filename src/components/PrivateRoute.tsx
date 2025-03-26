import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { JSX } from "react";

interface PrivateRouteProps {
    children: JSX.Element;
}

function PrivateRoute({ children }: PrivateRouteProps) {
    const isAuthenticated = useSelector(
        (state: RootState) => state.auth.isAuthenticated
    );

    if (!isAuthenticated) {
        return <Navigate to="/auth" replace />;
    }

    return children ? children : <Outlet />;
}

export default PrivateRoute;
