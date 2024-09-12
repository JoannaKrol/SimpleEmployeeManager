import { createSlice, PayloadAction } from '@reduxjs/toolkit';

enum Sex {
  Male = 1,
  Female = 2
}

export type EmployeeItem = {
  id: string;
  firstName: string;
  lastName: string;
  age?: number | null;
  sex: Sex;
}

type EmployeeListState = {
  employees: EmployeeItem[];
}

const initialState: EmployeeListState = {
  employees: [],
};

const employeeSlice = createSlice({
  name: 'list',
  initialState,
  reducers: {
    addEmployee: (state, action: PayloadAction<string>) => {
      const newEmployee: EmployeeItem = { id: action.payload, firstName: "firstName", lastName: "lastName", age: 25, sex: Sex.Female };
      state.employees.push(newEmployee);
    },
    removeEmployee: (state, action: PayloadAction<string>) => {
      state.employees = state.employees.filter(employee => employee.id !== action.payload);
    },
  },
});

export const { addEmployee, removeEmployee } = employeeSlice.actions;

export default employeeSlice.reducer;