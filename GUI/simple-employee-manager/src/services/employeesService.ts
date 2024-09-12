import axios from 'axios';
import { EmployeeItem } from '../redux/employeeSlice';

const API_URL = 'http://localhost:5188/api/Employees';

export const getAllEmployee = async (): Promise<EmployeeItem[]> => {
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