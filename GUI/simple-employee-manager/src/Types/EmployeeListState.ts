import Employee from "./Employee";

type EmployeeListState = {
  employees: Employee[];
  isLoading: boolean;
  error: string | null;
}

export default EmployeeListState