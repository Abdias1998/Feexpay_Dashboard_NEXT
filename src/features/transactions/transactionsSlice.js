import { createSlice } from "@reduxjs/toolkit";

export const transactionsSlice = createSlice({
  name: "transactions",
  initialState: {
    transactions: null,
  },
  reducers: {
   
    setGetTransactions: (state, { payload }) => {
      state.transactions = payload;
    },
   
  },
});

export const {
setGetTransactions

} = transactionsSlice.actions;
export default transactionsSlice.reducer;
