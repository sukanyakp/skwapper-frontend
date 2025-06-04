import TutorSignup from "@/components/authentication/TutorSignup"
import { Route, Routes } from "react-router-dom"


const TutorRoutes = () => {
  return (
    <div>
      
      <Routes>
        <Route path="/signup"  element={<TutorSignup/>}/>
      </Routes>
    </div>
  )
}

export default TutorRoutes
