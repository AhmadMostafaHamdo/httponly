import { configureStore } from "@reduxjs/toolkit";
import user from "../user/userSlice";
const store = configureStore({
  reducer: {
    user,
  },
});
export default store;
