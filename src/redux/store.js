import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./features/userSlice";
import appStateSlice from "./features/appStateSlice";
import authModalSlice from "./features/authModalSlice";
import globalLoadingSlice from "./features/globalLoadingSlice";

const store = configureStore({
    reducer: {
        user: userSlice,
        authModal: authModalSlice,
        globalLoading: globalLoadingSlice,
        appState: appStateSlice 
    }
})

export default store