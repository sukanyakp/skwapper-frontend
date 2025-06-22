  import { Navigate, Outlet } from "react-router-dom";
  import { useSelector } from "react-redux";
  import type { RootState } from "../store/store";

  const PublicAdminRoute = () => {
    const isAuthenticated = useSelector((state: any) => state.adminAuth.isAuthenticated);
    const admin = useSelector((state: RootState) => state.adminAuth.admin);
    console.log(isAuthenticated , 'isAuthenticated');
    

    return isAuthenticated ? <Navigate to="/admin/dashboard" replace /> : <Outlet />;
  };

  
  export default PublicAdminRoute;