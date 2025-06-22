import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store"; // adjust path if needed

const ProtectedAdminRoute = () => {
  const  isAuthenticated  = useSelector((state: RootState) => state.adminAuth.isAuthenticated);
  const admin = useSelector((state: RootState) => state.adminAuth.admin);
  console.log(isAuthenticated , 'admin isAuthenticated');
  

  return isAuthenticated ? <Outlet /> : <Navigate to="/admin/login" replace />;
};

export default ProtectedAdminRoute;
