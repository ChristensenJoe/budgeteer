import { createSlice } from "@reduxjs/toolkit";

const templateSlice = createSlice({
  name: "template",
  initialState: {
    entities: [], // array of todos
  },
  reducers: {
    todoAdded(state, action) {
      // update meeee
    },
  },
});

export const { todoAdded } = todosSlice.actions;

export default todosSlice.reducer;