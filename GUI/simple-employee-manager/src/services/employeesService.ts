import axios from 'axios';
import Employee from '../Types/Employee';

const API_URL = 'http://localhost:5188/api/Employees';

export const getAllEmployee = async (): Promise<Employee[]> => {
  try {
    const response = await axios.get<any>(API_URL, {
      headers: {
        'Accept': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const addEmployee = async (employee: Employee): Promise<void> => {
  try {
    await axios.post<Employee>(`${API_URL}/AddEmployee`, employee, {
      headers: {
        'Content-Type': 'application/json', 
      },
    });
  } catch (error) {
    console.error('Błąd podczas dodawania pracownika:', error);
    throw error;
  }
};

export const updateEmployee = async (employee: Employee): Promise<void> => {
  try {
    await axios.post<Employee>(`${API_URL}/UpdateEmployee`, employee, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Błąd podczas aktualizacji pracownika:', error);
    throw error;
  }
};

export const deleteEmployee = async (employeeId: string): Promise<void> => {
  try {
    await axios.delete(`${API_URL}/${employeeId}`, {
      headers: {
        'Accept': 'application/json',
      },
    });
  } catch (error) {
    console.error('Błąd podczas usuwania pracownika:', error);
    throw error;
  }
};

export const deleteEmployees = async (employeeIds: string[]): Promise<void> => {
  try {
    await axios.post(`${API_URL}/DeleteEmployees`, employeeIds, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Błąd podczas usuwania wielu pracowników:', error);
    throw error;
  }
};