import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/authSlice';
import layoutReducer from './layout/layoutSlice';
import balancesReducer from './balance/balanceSlice';
import transactionsReducer from './transactions/transactionsSlice';
import operatorsReducer from './balance/operatorsSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    layout: layoutReducer,
    balances: balancesReducer,
    operators : operatorsReducer,
    transactions: transactionsReducer
  }
}); 