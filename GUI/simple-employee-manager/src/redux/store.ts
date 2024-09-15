import { configureStore } from '@reduxjs/toolkit';
import employeesReducer from './employeeSlice'

const store = configureStore({
  reducer: {
    employees: employeesReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;