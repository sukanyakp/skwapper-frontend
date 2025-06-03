import Dashboard from "@/components/admin/Dashboard"
import AdminLogin from "@/components/authentication/AdminLogin"
import AdminRegister from "@/components/authentication/AdminRegister"
import { Route,Routes } from "react-router-dom"

const AdminRoutes = () => {
  return (
    <Routes>
      <Route  path="/login"     element={<AdminLogin/>}/>
      <Route  path="/register"  element={<AdminRegister/>}/>
      <Route  path="/dashboard" element = {<Dashboard/>}/>
    </Routes>
  )
}

export default AdminRoutes
