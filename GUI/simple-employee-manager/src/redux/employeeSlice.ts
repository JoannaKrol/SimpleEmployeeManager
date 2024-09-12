import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import EmployeeListState from '../Types/EmployeeListState';
import Employee from '../Types/Employee';

const initialState: EmployeeListState = {
  employees: [],
  isLoading: false,
  error: null
};

const employeeSlice = createSlice({
  name: 'employees',
  initialState,
  reducers: {
    fetchInit: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    fetchError: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload
    },
    fetchEmployees: (state, action: PayloadAction<Employee[]>) => {
      state.isLoading = false;
      state.employees = action.payload
    }
  },
});

export const { fetchInit, fetchError, fetchEmployees } = employeeSlice.actions;

export default employeeSlice.reducer;