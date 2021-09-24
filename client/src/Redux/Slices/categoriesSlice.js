import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchCategories = createAsyncThunk("categories/fetchCategories", (user_id) => {
    return fetch(`/users/${user_id}/categories`)
    .then(response => response.json())
    .then(data => data)
})

const categoriesSlice = createSlice({
  name: "categories",
  initialState: {
    entities: [],
    errors: [],
    status: 'idle'
  },
  reducers: {
    categoriesAdded(state, action) {
      state.entities.push(action.payload)
    },
    categoriesRemoved(state, action) {
      const index = state.entities.findIndex((category) => category === action.payload)
      state.entities.splice(index, 1)
    }
  },
  extraReducers: {
    [fetchCategories.pending](state) {
      state.status = "loading";
    },
    [fetchCategories.fulfilled](state, action) {
      if(Object.keys(action.payload).includes("errors")) {
        state.entities = false;
        state.errors = action.payload.errors;
        state.status = "error";
      }
      else {
        state.entities = action.payload;
        state.errors = [];
        state.status = "idle";
      }
    }
  }
});

export const { categoriesAdded, categoriesRemoved } = categoriesSlice.actions;

export default categoriesSlice.reducer;