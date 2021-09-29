import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchRecentTransactions = createAsyncThunk("recentTransactions/fetchRecentTransactions", (user_id) => {
    return fetch(`/users/${user_id}/payments/recent`)
    .then(response => response.json())
    .then(data => data)
})

const recentTransactionsSlice = createSlice({
  name: "transactions",
  initialState: {
    entities: [],
    errors: [],
    status: 'idle'
  },
  reducers: {
    recentTransactionsAdded(state, action) {
      state.entities.unshift(action.payload)
    },
    recentTransactionsRemoved(state, action) {
      const index = state.entities.findIndex((recentTransaction) => recentTransaction === action.payload)
      state.entities.splice(index, 1)
    },
    recentTransactionsUpdated(state, action) {
      const index = state.entities.findIndex((recentTransaction) => recentTransaction.id === action.payload.id)
      state.entities.splice(index, 1, action.payload)
    }
  },
  extraReducers: {
    [fetchRecentTransactions.pending](state) {
      state.status = "loading";
    },
    [fetchRecentTransactions.fulfilled](state, action) {
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

export const { recentTransactionsAdded, recentTransactionsRemoved, recentTransactionsUpdated } = recentTransactionsSlice.actions;

export default recentTransactionsSlice.reducer;