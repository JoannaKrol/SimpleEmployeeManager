import { useEffect } from 'react';
import { AxiosError } from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../Redux/store';
import { addEmployee, deleteEmployee, getAllEmployee, updateEmployee } from '../Services/EmployeesService';
import { fetchInit, fetchEmployees, fetchError } from '../Redux/EmployeeSlice'
import Employee from '../Types/Employee';
import Sex from '../Types/Sex';

const EmployeeComponent = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { employees, isLoading, error } = useSelector((state: RootState) => state.employees);

  useEffect(() => {
    handleAction(() => Promise.resolve())
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAction = async (restAction: () => Promise<void>) => {
    try {
      dispatch(fetchInit())
      await restAction().then(async _ => {
        const employeesData = await getAllEmployee();
        dispatch(fetchEmployees(employeesData));
      })
    } catch (err) {
      dispatch(fetchError(JSON.stringify((err as AxiosError).response?.data, null, 2)))
    }
  }

  const handleAddEmployee = async () => {
    const newEmployee: Employee = {
      firstName: "Jan",
      lastName: "Kowal",
      sex: Sex.Male,
      age: 18
    }
    handleAction(() => addEmployee(newEmployee))
  }

  const handleUpdateEmployee = async (employee: Employee) => {
    const updatedEmployee = { ...employee, sex: employee.sex === Sex.Female ? Sex.Male : Sex.Female}
    handleAction(() => updateEmployee(updatedEmployee))
  }

  const handleDeleteEmployee = async (id: string) => {
    handleAction(() => deleteEmployee(id))
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>Employees list</h1>
      <ul>
        {employees.map(employee => (
          <li key={employee.id}>
            <span>{employee.firstName} {employee.lastName}, {employee.age && `Age: ${employee.age}`}, Sex: {employee.sex === 1 ? 'Male' : 'Female'}</span>
            <button onClick={() => handleDeleteEmployee(employee.id!)}>Delete</button>
            <button onClick={() => handleUpdateEmployee(employee)}>Update</button>
          </li>
        ))}
      </ul>
      <button onClick={() => handleAddEmployee()}>Add new employee</button>
    </div>
  );
};

export default EmployeeComponent;