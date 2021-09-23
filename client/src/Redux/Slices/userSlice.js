import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchUser = createAsyncThunk("user/fetchUser", () => {
    return fetch("/me")
    .then(response => response.json())
    .then(data => data)
})

const userSlice = createSlice({
  name: "user",
  initialState: {
    entities: false,
    errors: [],
    status: 'idle'
  },
  reducers: {
    userSet(state, action) {
      state.entities = action.payload
    },
  },
  extraReducers: {
    [fetchUser.pending](state) {
      state.status = "loading";
    },
    [fetchUser.fulfilled](state, action) {
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

export const { userSet } = userSlice.actions;

export default userSlice.reducer;