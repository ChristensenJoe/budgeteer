import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchTransactions = createAsyncThunk("transactions/fetchTransactions", (user_id) => {
    return fetch(`/users/${user_id}/payments`)
    .then(response => response.json())
    .then(data => data)
})

const transactionsSlice = createSlice({
  name: "transactions",
  initialState: {
    entities: [],
    errors: [],
    status: 'idle'
  },
  reducers: {
    transactionsAdded(state, action) {
      state.entities.push(action.payload)
    },
    transactionsRemoved(state, action) {
      const index = state.entities.findIndex((transaction) => transaction === action.payload)
      state.entities.splice(index, 1)
    },
    transactionsUpdated(state, action) {
      const index = state.entities.findIndex((transaction) => transaction.id === action.payload.id)
      state.entities.splice(index, 1, action.payload)
    }
  },
  extraReducers: {
    [fetchTransactions.pending](state) {
      state.status = "loading";
    },
    [fetchTransactions.fulfilled](state, action) {
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

export const { transactionsAdded, transactionsRemoved, transactionsUpdated } = transactionsSlice.actions;

export default transactionsSlice.reducer;