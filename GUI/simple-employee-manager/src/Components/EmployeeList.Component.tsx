import { useEffect, useState } from 'react';
import { AxiosError } from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { List, Button, Box, Paper, Stack, CircularProgress } from '@mui/material';
import { AppDispatch, RootState } from '../Redux/store';
import { addEmployee, deleteEmployee, deleteEmployees, getAllEmployee, updateEmployee } from '../Services/EmployeesService';
import { fetchInit, fetchEmployees, fetchError } from '../Redux/EmployeeSlice'
import Employee from '../Types/Employee';
import Sex from '../Types/Sex';
import EmployeeForm from './EmployeeForm.Component';
import ErrorNotification from './ErrorNotification.Component';
import EmployeeItem from './EmployeeItem';
import ConfirmDeletion from './ConfirmDeletion.Component';

const EmployeeComponent = () => {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [employeeToDelete, setEmployeeToDelete] = useState<string | null>(null);
  const [employeeForm, setEmployeeForm] = useState<Employee | null>(null);
  const [employeesToDelete, setEmployeesToDelete] = useState<string[] | null>(null);
  const [formEmployeeVisible, setFormEmployeeVisibile] = useState<boolean>(false)
  const [deleteEmployeeVisible, setDeleteEmployeeVisibile] = useState<boolean>(false)
  const [deleteEmployeesVisible, setDeleteEmployeesVisibile] = useState<boolean>(false)
  const dispatch = useDispatch<AppDispatch>();
  const { employees, isLoading, error } = useSelector((state: RootState) => state.employees);

  useEffect(() => {
    handleAction(() => Promise.resolve())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleToggle = (id: string | undefined) => {
    if (!id) return;

    setSelectedIds((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((selectedId) => selectedId !== id)
        : [...prevSelected, id]
    );
  };

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

  const handleAddEmployee = async (newEmployee: Employee) => {
    handleAction(() => addEmployee(newEmployee))
  }

  const handleUpdateEmployee = async (employee: Employee) => {
    const updatedEmployee = { ...employee, sex: employee.sex === Sex.Female ? Sex.Male : Sex.Female }
    handleAction(() => updateEmployee(updatedEmployee))
  }

  const handleDeleteEmployee = async (id: string) => {
    selectedIds.includes(id) && handleToggle(id)
    handleAction(() => deleteEmployee(id))
  }

  const handleDeleteSelectedEmployees = async (ids: string[]) => {
    handleAction(() => deleteEmployees(ids))
    setSelectedIds([])
  }

  const handleEmployeeDeleteClick = (id: string) => {
    setEmployeeToDelete(id);
    setDeleteEmployeeVisibile(true);
  };

  const handleConfirmDelete = () => {
    if (employeeToDelete) {
      handleDeleteEmployee(employeeToDelete);
      setEmployeeToDelete(null);
      setDeleteEmployeeVisibile(false);
    }
  };

  const handleCancelDelete = () => {
    setEmployeeToDelete(null);
    setDeleteEmployeeVisibile(false);
  };

  const handleEmployeesDeleteClick = (ids: string[]) => {
    setEmployeesToDelete(ids);
    setDeleteEmployeesVisibile(true);
  };

  const handleConfirmEmployeesDelete = () => {
    if (employeesToDelete) {
      handleDeleteSelectedEmployees(employeesToDelete);
      setEmployeesToDelete(null);
      setDeleteEmployeesVisibile(false);
    }
  };

  const handleCancelEmployeesDelete = () => {
    setEmployeesToDelete(null);
    setDeleteEmployeesVisibile(false);
  };

  const handleEmployeeFormClick = (employee: Employee | null) => {
    setEmployeeForm(employee);
    setFormEmployeeVisibile(true);
  };

  const handleConfirmEmployeeForm = (employee: Employee) => {
    employeeForm ? handleUpdateEmployee(employee) : handleAddEmployee(employee);
    setEmployeeForm(null);
    setFormEmployeeVisibile(false);
  };

  const handleCancelEmployeeForm = () => {
    setEmployeeForm(null);
    setFormEmployeeVisibile(false);
  };

  return (
    <Box
      sx={{
        backgroundColor: '#1976d2',
        display: 'flex',
        justifyContent: 'center',
        minHeight: '100vh'
      }}
    >
      <Paper
        elevation={3}
        sx={{
          maxWidth: '600px',
          maxHeight: '600px',
          width: '100%',
          margin: '20px',
          padding: '20px',
          backgroundColor: '#a5a5a5',
          borderRadius: '8px',
        }}
      >
        <h1>Employees list</h1>
        {employees.length === 0 && <div>No items to display</div>}
        <List style={{ maxHeight: '450px', overflowY: 'auto', borderRadius: '9px', padding: 0 }}>
          {employees.map((employee, index) => {
            return (
              <EmployeeItem
                key={employee.id}
                employee={employee}
                index={index}
                selectedIds={selectedIds}
                handleToggle={handleToggle}
                handleUpdateEmployee={handleEmployeeFormClick}
                handleEmployeeDeleteClick={handleEmployeeDeleteClick}
                isLoading={isLoading}
              />
            );
          })}
        </List>
        <Stack spacing={2} direction="row" sx={{ paddingTop: '20px' }}>
          <Button color="primary" variant="contained" disabled={isLoading} onClick={() => handleEmployeeFormClick(null)}>Add new employee</Button>
          <Button color="primary" variant="contained" disabled={isLoading || employees.length === 0} onClick={() => handleEmployeesDeleteClick(selectedIds)}>Remove selected employees</Button>

          {isLoading && (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <CircularProgress thickness={4} sx={{ color: '#1976d2' }} />
            </Box>
          )}
        </Stack>
        <EmployeeForm
          open={formEmployeeVisible}
          employeeToEdit={employeeForm}
          onSubmit={(employee) => handleConfirmEmployeeForm(employee)}
          onClose={() => handleCancelEmployeeForm()}
        />
        <ConfirmDeletion
          open={deleteEmployeeVisible}
          question={"Are you sure do you want remove this employee?"}
          handleCancelDelete={() => handleCancelDelete()}
          handleConfirmDelete={() => handleConfirmDelete()}
        />
        <ConfirmDeletion
          open={deleteEmployeesVisible}
          question={"Are you sure do you want remove all selected employees?"}
          handleCancelDelete={() => handleCancelEmployeesDelete()}
          handleConfirmDelete={() => handleConfirmEmployeesDelete()}
        />
        {error && <ErrorNotification error={error} clearError={() => handleAction(() => Promise.resolve())} />}
      </Paper>
    </Box>
  );
};

export default EmployeeComponent;