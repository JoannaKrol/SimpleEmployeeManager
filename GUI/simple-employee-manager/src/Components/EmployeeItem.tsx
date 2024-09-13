import React from 'react';
import { ListItem, ListItemText, Checkbox, IconButton } from '@mui/material';
import Edit from '@mui/icons-material/Edit';
import Delete from '@mui/icons-material/Delete';
import Employee from '../Types/Employee';
import Sex from '../Types/Sex';

type EmployeeItemProps = {
  employee: Employee;
  index: number;
  selectedIds: string[];
  handleToggle: (id: string) => void;
  handleUpdateEmployee: (employee: Employee) => void;
  handleEmployeeDeleteClick: (id: string) => void;
  isLoading: boolean;
};

const EmployeeItem: React.FC<EmployeeItemProps> = ({
  employee,
  index,
  selectedIds,
  handleToggle,
  handleUpdateEmployee,
  handleEmployeeDeleteClick,
  isLoading,
}) => {
  const fullName = `${employee.firstName} ${employee.lastName}`;
  const ageString = employee.age ? `, ${employee.age} years` : '';

  const backgroundColor = index % 2 === 0 ? '#e5e5e5' : '#ffffff';

  return (
    <ListItem style={{ backgroundColor }}>
      <Checkbox
        checked={selectedIds.includes(employee.id!)}
        onChange={() => handleToggle(employee.id!)}
        disabled={isLoading}
      />
      <ListItemText primary={fullName} secondary={`${Sex[+employee.sex]}${ageString}`} sx={{ overflowWrap: 'break-word' }} />

      <IconButton
        aria-label="edit"
        color="primary"
        onClick={() => handleUpdateEmployee(employee)}
        style={{ marginRight: '10px' }}
        disabled={isLoading}
      >
        <Edit />
      </IconButton>
      <IconButton
        aria-label="delete"
        color="primary"
        onClick={() => handleEmployeeDeleteClick(employee.id!)}
        style={{ marginRight: '10px' }}
        disabled={isLoading}
      >
        <Delete />
      </IconButton>
    </ListItem>
  );
};

export default EmployeeItem;
