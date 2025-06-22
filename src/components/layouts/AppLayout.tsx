// App.tsx or AppLayout.tsx
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loginSuccess, logout } from "../../store/slices/userSlice";
import {jwtDecode} from "jwt-decode";

interface DecodedToken {
  _id: string;
  email: string;
  name: string;
  role: string;
  exp: number; // expiry time
}

const AppInitializer = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    console.log( 'we are at appLayout ');
    

    if (token) {
      try {
        const decoded: DecodedToken = jwtDecode(token);
        const now = Date.now() / 1000;

        if (decoded.exp > now) {
          // Token is still valid
          dispatch(loginSuccess({ _id: decoded._id, email: decoded.email, name: decoded.name, role: decoded.role }));
        } else {
          // Token expired
          dispatch(logout());
          localStorage.removeItem("accessToken");
        }
      } catch (error) {
        console.error("Invalid token:", error);
        dispatch(logout());
        localStorage.removeItem("accessToken");
      }
    }
  }, [dispatch]);

  return null;
};

export default AppInitializer;
