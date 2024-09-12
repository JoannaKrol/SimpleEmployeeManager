import React, { useEffect, useState } from 'react';
import { EmployeeItem } from '../redux/employeeSlice';
import { getAllEmployee } from '../services/employeesService';

const EmployeeComponent: React.FC = () => {
  const [employeeItems, setEmployeeItems] = useState<EmployeeItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const employeesData = await getAllEmployee();
        setEmployeeItems(employeesData);
        setLoading(false);
      } catch (err) {
        setError('Error');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>Employees list</h1>
      <ul>
        {employeeItems.map(employee => (
          <li key={employee.id}>
            {employee.firstName} {employee.lastName}, {employee.age && `Age: ${employee.age}`}, Sex: {employee.sex === 1 ? 'Male' : 'Female'}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EmployeeComponent;