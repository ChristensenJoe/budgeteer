import { configureStore } from "@reduxjs/toolkit";

import userReducer from './Slices/userSlice';
import categoriesReducer from './Slices/categoriesSlice'
import transactionsReducer from './Slices/transactionsSlice'

const store = configureStore({
  reducer: {
    user: userReducer,
    categories: categoriesReducer,
    transactions: transactionsReducer
  },
});

export default store;