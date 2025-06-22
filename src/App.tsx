import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "./components/ui/sonner";
import StudentRoutes from "./routes/student-routes";
import AdminRoutes from "./routes/admin-routes";
import { Provider, useDispatch } from "react-redux";
import {store} from "./store/store";
import TutorRoutes from "./routes/tutor-routes";
import AppInitializer from "./components/layouts/AppLayout";
import { useEffect } from "react";


const App = () => {

  //  const dispatch = useDispatch();

  // useEffect(() => {
  //   const storedUser = localStorage.getItem("accessToken");
  //   if (storedUser) {
  //     console.log(storedUser , 'storedUser');
      
  //     dispatch(loginSuccess(JSON.parse(storedUser)));
  //   }
  // }, [dispatch]);

  // this is the reason whyafter reloading the data is getting.
  return (
    <Provider store={store}>
      <BrowserRouter>
        {/* Initialize app auth from token on reload */}
        {/* <AppInitializer /> */}

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
