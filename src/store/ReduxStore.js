import { configureStore } from "@reduxjs/toolkit";
import Unread from './unreadSlice'

const store = configureStore({
  reducer: { Unread },
});

export default store;
