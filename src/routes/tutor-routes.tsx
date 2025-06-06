import PendingApproval from "@/components/authentication/PendingApproval"
import TutorSignup from "@/components/authentication/TutorSignup"
import { Route, Routes } from "react-router-dom"


const TutorRoutes = () => {
  return (
    <div>
      
      <Routes>
        <Route path="/signup"  element={<TutorSignup/>}/>
        <Route path="/pending-approval" element={<PendingApproval/>}/>
      </Routes>
    </div>
  )
}

export default TutorRoutes
