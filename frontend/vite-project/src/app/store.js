import { configureStore } from "@reduxjs/toolkit";

import authReducer from "../slices/authSlice";
import codeReducer from "../slices/codeSlice";
import themeReducer from "../slices/themeSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    code: codeReducer,
    theme: themeReducer,
  },
});

export default store;