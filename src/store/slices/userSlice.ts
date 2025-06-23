import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit"

interface AuthState {
  user: any | null; 
  accessToken: string | null;
  isAuthenticated: boolean;
}

const storedUser = localStorage.getItem("student");
const storedToken = localStorage.getItem("student_token");

const initialState: AuthState = {
  user: storedUser ? JSON.parse(storedUser) : null,
  accessToken: storedToken || null,
  isAuthenticated: !!storedToken, 
};


const authSlice = createSlice({
  name: "auth", 
  initialState,
  reducers: {
   loginSuccess: (
  state,
  action: PayloadAction<{ user: any; accessToken: string }>
) => {
  state.user = action.payload.user;
  state.accessToken = action.payload.accessToken;
  state.isAuthenticated = true;

  localStorage.setItem("student", JSON.stringify(action.payload.user));
  localStorage.setItem("student_token", action.payload.accessToken);
}
,
    logout: (state) => {
      state.user = null;
      state.accessToken = null;
      state.isAuthenticated = false;

      localStorage.removeItem("student");
      localStorage.removeItem("student_token");
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;