import PendingApproval from "@/components/authentication/PendingApproval";
import TutorSignup from "@/components/authentication/TutorSignup";
import ProtectedRoute from "../routes/protected-routes";
import { Route, Routes } from "react-router-dom";
import TutorHome from "@/components/tutor/TutorHome";

const TutorRoutes = () => {
  return (
    <Routes>
      {/* <Route path="/signup" element={<TutorSignup />} /> */}
      <Route path="/home" element={<TutorHome/>}/>

      {/* Protect the pending-approval route */}
      <Route element={<ProtectedRoute />}>
        <Route path="/pending-approval" element={<PendingApproval />} />
      </Route>
    </Routes>
  );
};

export default TutorRoutes;
