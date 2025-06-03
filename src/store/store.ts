import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/userSlice";

export const store = configureStore({
    reducer : {
        auth : authReducer 
    }
})

export type RooteState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store ;