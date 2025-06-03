import { Navigate , Outlet } from "react-router-dom"
import { useSelector } from "react-redux";
import type { RooteState } from "../store/store";

const ProtectedRoutes = () => {
  
  const isAuthenticated = useSelector((state : RooteState) => state.auth.isAuthenticated)
  return isAuthenticated ? <Outlet/> : <Navigate  to="/login"  replace/>
}

export default ProtectedRoutes
