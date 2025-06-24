import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "./components/ui/sonner";
import StudentRoutes from "./routes/student-routes";
import AdminRoutes from "./routes/admin-routes";
import { Provider } from "react-redux";
import {store} from "./store/store";
import TutorRoutes from "./routes/tutor-routes";
import NotFound from "./components/common/NotFound";



const App = () => {

  return (
    <Provider store={store}>
      <BrowserRouter>

        {/* Global toaster notifications */}
        <Toaster />

        <Routes>
          <Route path="/*" element={<StudentRoutes />} />
          <Route path="/admin/*" element={<AdminRoutes />} />
          <Route path="/tutor/*" element={<TutorRoutes />} />
         

        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
