import { BrowserRouter,Route,Routes } from "react-router-dom"
import Signup from "./components/authentication/Signup"
import VerifyOtp from "./components/authentication/VerifyOtp"
import Login from "./components/authentication/Login"

const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      < Route  path="/user/signup" element={<Signup/>}/>
      < Route  path="/user/verify-otp" element ={<VerifyOtp/>}/>
      < Route  path="/user/login"  element = {<Login/>}/>
    </Routes>
    


    </BrowserRouter>

  )
}

export default App
