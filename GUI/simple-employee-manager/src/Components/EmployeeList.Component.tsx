import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AxiosError } from 'axios';
import { List, Button, Box, Paper, Stack, CircularProgress } from '@mui/material';
import { AppDispatch, RootState } from '../Redux/store';
import { fetchInit, fetchEmployees, fetchError } from '../Redux/EmployeeSlice'
import { addEmployee, deleteEmployee, deleteEmployees, getAllEmployee, updateEmployee } from '../Services/EmployeesService';
import Employee from '../Types/Employee';
import EmployeeItem from './EmployeeItem.Component';
import EmployeeForm from './EmployeeForm.Component';
import ConfirmDeletion from './ConfirmDeletion.Component';
import ErrorNotification from './ErrorNotification.Component';

const EmployeeComponent = () => {
  // Add or edit employee state
  const [employeeForm, setEmployeeForm] = useState<Employee | null>(null);
  const [employeeFormVisible, setEmployeeFormVisibile] = useState<boolean>(false);

  // Delete employee state
  const [employeeToDelete, setEmployeeToDelete] = useState<string | null>(null);
  const [deleteEmployeeVisible, setDeleteEmployeeVisibile] = useState<boolean>(false);

  // Delete selected employee state
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [employeesToDelete, setEmployeesToDelete] = useState<string[] | null>(null);
  const [deleteEmployeesVisible, setDeleteEmployeesVisibile] = useState<boolean>(false);
  
  const dispatch = useDispatch<AppDispatch>();
  const { employees, isLoading, error } = useSelector((state: RootState) => state.employees);

  useEffect(() => {
    handleRestAction(() => Promise.resolve());
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

  //#region Rest operation
  const handleRestAction = async (restAction: () => Promise<void>) => {
    try {
      dispatch(fetchInit());
      await restAction().then(async _ => {
        const employeesData = await getAllEmployee();
        dispatch(fetchEmployees(employeesData));
      })
    } catch (err) {
      dispatch(fetchError(JSON.stringify((err as AxiosError).response?.data, null, 2)));
    }
  }

  const handleRestAddEmployee = async (newEmployee: Employee) => {
    handleRestAction(() => addEmployee(newEmployee));
  };

  const handleRestUpdateEmployee = async (employee: Employee) => {
    handleRestAction(() => updateEmployee(employee));
  };

  const handleRestDeleteEmployee = async (id: string) => {
    selectedIds.includes(id) && handleToggle(id);
    handleRestAction(() => deleteEmployee(id));
  };

  const handleRestDeleteSelectedEmployees = async (ids: string[]) => {
    handleRestAction(() => deleteEmployees(ids));
    setSelectedIds([]);
  };
  //#endregion

  //#region Delete employee operation function
  const handleDeleteEmployeeClick = (id: string) => {
    setEmployeeToDelete(id);
    setDeleteEmployeeVisibile(true);
  };

  const onConfirmDeleteEmployee = () => {
    if (employeeToDelete) {
      handleRestDeleteEmployee(employeeToDelete);
      setEmployeeToDelete(null);
      setDeleteEmployeeVisibile(false);
    }
  };

  const onCancelDeleteEmployee = () => {
    setEmployeeToDelete(null);
    setDeleteEmployeeVisibile(false);
  };
  //#endregion

  //#region Delete list of employee operation function
  const handleDeleteEmployeeListClick = (ids: string[]) => {
    setEmployeesToDelete(ids);
    setDeleteEmployeesVisibile(true);
  };

  const onConfirmDeleteEmployeeList = () => {
    if (employeesToDelete) {
      handleRestDeleteSelectedEmployees(employeesToDelete);
      setEmployeesToDelete(null);
      setDeleteEmployeesVisibile(false);
    }
  };

  const onCancelDeleteEmployeeList = () => {
    setEmployeesToDelete(null);
    setDeleteEmployeesVisibile(false);
  };
  //#endregion

  //#region Add or edit operation function
  const handleEmployeeFormClick = (employee: Employee | null) => {
    setEmployeeForm(employee);
    setEmployeeFormVisibile(true);
  };

  const onSubmitEmployeeFormChanges = (employee: Employee) => {
    employeeForm ? handleRestUpdateEmployee(employee) : handleRestAddEmployee(employee);
    setEmployeeForm(null);
    setEmployeeFormVisibile(false);
  };

  const onCancelEmployeeFormChanges = () => {
    setEmployeeForm(null);
    setEmployeeFormVisibile(false);
  };
  //#endregion

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
                handleUpdate={(employee) => handleEmployeeFormClick(employee)}
                handleDelete={handleDeleteEmployeeClick}
                isLoading={isLoading}
              />
            );
          })}
        </List>

        <Stack spacing={2} direction="row" sx={{ paddingTop: '20px' }}>
          <Button color="primary" variant="contained" disabled={isLoading} onClick={() => handleEmployeeFormClick(null)}>Add new employee</Button>
          <Button color="primary" variant="contained" disabled={isLoading || selectedIds.length === 0} onClick={() => handleDeleteEmployeeListClick(selectedIds)}>Remove selected employees</Button>

          {isLoading && (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <CircularProgress thickness={4} sx={{ color: '#1976d2' }} />
            </Box>
          )}
        </Stack>

        <EmployeeForm
          open={employeeFormVisible}
          employeeToEdit={employeeForm}
          onSubmit={onSubmitEmployeeFormChanges}
          onCancel={onCancelEmployeeFormChanges}
        />

        <ConfirmDeletion
          open={deleteEmployeeVisible}
          question={"Are you sure do you want remove this employee?"}
          onCancel={onCancelDeleteEmployee}
          onConfirm={onConfirmDeleteEmployee}
        />
        <ConfirmDeletion
          open={deleteEmployeesVisible}
          question={"Are you sure do you want remove all selected employees?"}
          onCancel={onCancelDeleteEmployeeList}
          onConfirm={onConfirmDeleteEmployeeList}
        />

        {error && <ErrorNotification error={error} clearError={() => handleRestAction(Promise.resolve)} />}
      </Paper>
    </Box>
  );
};

export default EmployeeComponent;