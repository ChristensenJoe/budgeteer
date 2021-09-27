import { configureStore } from "@reduxjs/toolkit";

import userReducer from './Slices/userSlice';
import categoriesReducer from './Slices/categoriesSlice'

const store = configureStore({
  reducer: {
    user: userReducer,
    categories: categoriesReducer
  },
});

export default store;