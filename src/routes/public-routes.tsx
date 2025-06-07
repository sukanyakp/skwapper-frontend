  import { Navigate, Outlet } from "react-router-dom";
  import { useSelector } from "react-redux";

  const PublicRoute = () => {
    const isAuthenticated = useSelector((state: any) => state.auth.isAuthenticated);

    return isAuthenticated ? <Navigate to="/" replace /> : <Outlet />;
  };

  export default PublicRoute;