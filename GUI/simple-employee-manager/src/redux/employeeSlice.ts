import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Employee from '../Types/Employee';

type EmployeeListState = {
  employees: Employee[];
  isLoading: boolean;
  error: string | null;
}

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