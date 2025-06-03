import { BrowserRouter,Route,Routes } from "react-router-dom"
import { Toaster } from "./components/ui/sonner"
import StudentRoutes from "./routes/student-routes"
import AdminRoutes from "./routes/admin-routes"
import { Provider } from "react-redux"
import store from "./store/store"


const App = () => {
  return (
    <BrowserRouter>

    < Provider store = {store} >
  
    {/* Toaster */}
    <Toaster/>
    
    <Routes>
      < Route  path="/*" element={<StudentRoutes/>}/>
      < Route  path="/admin/*" element={<AdminRoutes/>}/>
   
    </Routes>
      </Provider>


    </BrowserRouter>

  )
}

export default App
