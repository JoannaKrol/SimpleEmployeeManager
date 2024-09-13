import React, { useEffect, useState } from 'react';
import { TextField, Button, MenuItem, Select, InputLabel, FormControl, FormHelperText, Box, Dialog, DialogActions, DialogContent, DialogTitle, SelectChangeEvent, Stack } from '@mui/material';
import Employee from '../Types/Employee';
import Sex from '../Types/Sex';

type EmployeeFormProps = {
  open: boolean;
  employeeToEdit: Employee | null;
  onClose: () => void;
  onSubmit: (employee: Employee) => void;
};

const EmployeeForm: React.FC<EmployeeFormProps> = ({ open, employeeToEdit, onClose, onSubmit }) => {
  const [formData, setFormData] = useState<Employee>({
    firstName: '',
    lastName: '',
    sex: '',
    age: undefined
  });

  const [errors, setErrors] = useState({
    firstName: false,
    lastName: false,
    sex: false,
    age: false
  });
  
  useEffect(() => {
    if (employeeToEdit) {
      setFormData(employeeToEdit);
    }
  }, [employeeToEdit]);

  const handleChange = (e: SelectChangeEvent<Sex> | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | { name?: string; value: unknown }>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name as keyof Employee]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const { firstName, lastName, sex, age } = formData;

    const newErrors = {
      firstName: firstName === '',
      lastName: lastName === '',
      sex: sex === undefined,
      age: age !== undefined && (+age < 18 || +age > 100),
    };

    setErrors(newErrors);

    const hasErrors = Object.values(newErrors).some((error) => error);

    if (!hasErrors) {
      onSubmit(formData);
      handleClose();
    }
  };

  const handleClose = () => {
    setFormData({
      firstName: '',
      lastName: '',
      sex: '',
      age: undefined
    });
    setErrors({
      firstName: false,
      lastName: false,
      sex: false,
      age: false
    });
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{employeeToEdit ? 'Employee edit' : 'Employee add'}</DialogTitle>
      <DialogContent>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ display: 'flex', flexDirection: 'column', gap: 2, paddingTop: 2 }}
        >
          <TextField
            label="First name"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            error={errors.firstName}
            helperText={errors.firstName ? 'First name is required' : ''}
            required
            fullWidth
          />

          <TextField
            label="Last name"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            error={errors.lastName}
            helperText={errors.lastName ? 'Last name is required' : ''}
            required
            fullWidth
          />

          <TextField
            label="Age"
            name="age"
            type="number"
            value={formData.age || ''}
            onChange={handleChange}
            error={errors.age}
            helperText={errors.age ? 'Age must by between 18-100' : ''}
            fullWidth
          />

          <FormControl fullWidth error={errors.sex}>
            <InputLabel id="sex-label">Sex</InputLabel>
            <Select
              labelId="sex-label"
              name="sex"
              value={formData.sex}
              onChange={handleChange}
              required
            >
              <MenuItem value={Sex.Male}>Male</MenuItem>
              <MenuItem value={Sex.Female}>Female</MenuItem>
            </Select>
            {errors.sex && <FormHelperText>Sex is required</FormHelperText>}
          </FormControl>
        </Box>
      </DialogContent>
      <DialogActions>
        <Stack spacing={2} direction="row">
          <Button onClick={handleClose} color="primary" variant="outlined">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary" variant="contained">
            {employeeToEdit ? 'Save Changes' : 'Add Employee'}
          </Button>
        </Stack>
      </DialogActions>
    </Dialog>
  );
};

export default EmployeeForm;
