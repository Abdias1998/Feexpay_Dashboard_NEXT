import { createSlice } from "@reduxjs/toolkit";

export const operatorsSlice = createSlice({
  name: "operators",
  initialState: {
    operators: null,
  },
  reducers: {

    setGetOperatorsStats : (state,{payload})=>{
      state.operators = payload;
    }
  },
});

export const {
  setGetOperatorsStats

} = operatorsSlice.actions;
export default operatorsSlice.reducer;
