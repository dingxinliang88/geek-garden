import { configureStore } from "@reduxjs/toolkit";
import userReducer from "@/store/user/index";

const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

export default store;
