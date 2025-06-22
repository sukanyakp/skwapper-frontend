  import { Navigate, Outlet } from "react-router-dom";
  import { useSelector } from "react-redux";

  const PublicRoute = () => {
    const isAuthenticated = useSelector((state: any) => state.auth.isAuthenticated);
    const token = localStorage.getItem("accessToken")


    return isAuthenticated ? <Navigate to="/" replace /> : <Outlet />;
  };


  export default PublicRoute;