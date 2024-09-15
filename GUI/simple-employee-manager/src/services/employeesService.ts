import axiosInstance from '../Axios/axiosInstance';
import Employee from '../Types/Employee';

export const getAllEmployee = async (): Promise<Employee[]> => {
  try {
    const response = await axiosInstance.get('/');
    return response.data;
  } catch (error) {
    console.error('getAllEmployee - error:', error);
    throw error;
  }
};

export const addEmployee = async (employee: Employee): Promise<void> => {
  try {
    await axiosInstance.post('/AddEmployee', employee);
  } catch (error) {
    console.error('addEmployee - error:', error);
    throw error;
  }
};

export const updateEmployee = async (employee: Employee): Promise<void> => {
  try {
    await axiosInstance.post('/UpdateEmployee', employee);
  } catch (error) {
    console.error('updateEmployee - error:', error);
    throw error;
  }
};

export const deleteEmployee = async (employeeId: string): Promise<void> => {
  try {
    await axiosInstance.delete(`/${employeeId}`);
  } catch (error) {
    console.error('deleteEmployee - Error:', error);
    throw error;
  }
};

export const deleteEmployees = async (employeeIds: string[]): Promise<void> => {
  try {
    await axiosInstance.post('/DeleteEmployees', employeeIds);
  } catch (error) {
    console.error('deleteEmployees - Error:', error);
    throw error;
  }
};
