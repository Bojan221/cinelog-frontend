import { configureStore } from "@reduxjs/toolkit";
import previewSheetReducer from "./previewSheetSlice";
import authReducer from "./authSlice";

export const store = configureStore({
    reducer: {
        previewSheet: previewSheetReducer,
        auth: authReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;