import { createSlice } from "@reduxjs/toolkit";

export const balanceSlice = createSlice({
  name: "balances",
  initialState: {
    balances: [],
  },
  reducers: {
    /**Récuperer les données de l'user */
    setGetLast24H: (state, { payload }) => {
      state.balances = payload;
    },
    setGetBalance: (state, { payload }) => {
      state.balances = payload;
    },
   
  },
});

export const {
  setGetLast24H,
  setGetBalance,
 

} = balanceSlice.actions;
export default balanceSlice.reducer;
