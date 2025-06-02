import { BrowserRouter,Route,Routes } from "react-router-dom"
import { Toaster } from "./components/ui/sonner"
import StudentRoutes from "./routes/student-routes"
import AdminRoutes from "./routes/admin-routes"


const App = () => {
  return (
    <BrowserRouter>
    {/* Toaster */}
    <Toaster/>
    
    <Routes>
      < Route  path="/*" element={<StudentRoutes/>}/>
      < Route  path="/admin/*" element={<AdminRoutes/>}/>
      {/* < Route  path="/about" element={<About/>}/> */}
      {/* < Route  path="/signup" element={<Signup/>}/> */}
      {/* < Route  path="/user/verify-otp" element ={<VerifyOtp/>}/>
      < Route  path="/user/login"  element = {<Login/>}/> */}
    </Routes>
    


    </BrowserRouter>

  )
}

export default App
