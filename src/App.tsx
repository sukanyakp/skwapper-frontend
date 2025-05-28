import { BrowserRouter,Route,Routes } from "react-router-dom"
import Signup from "./components/authentication/Signup"
import VerifyOtp from "./components/authentication/VerifyOtp"
import Login from "./components/authentication/Login"
import { Toaster } from "./components/ui/sonner"
import Home from "./components/student/Home"
import About from "./components/student/About"


const App = () => {
  return (
    <BrowserRouter>
    <Toaster/>
    
    <Routes>
      < Route  path="/" element={<Home/>}/>
      < Route  path="/about" element={<About/>}/>
      < Route  path="/user/signup" element={<Signup/>}/>
      < Route  path="/user/verify-otp" element ={<VerifyOtp/>}/>
      < Route  path="/user/login"  element = {<Login/>}/>
    </Routes>
    


    </BrowserRouter>

  )
}

export default App
