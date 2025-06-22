import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/userSlice";
import adminAuthReducer from "./slices/adminSlice"; // ✅ Step 1: import the admin reducer

export const store = configureStore({
  reducer: {
    auth: authReducer,
    adminAuth: adminAuthReducer, // ✅ Step 2: add to reducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
