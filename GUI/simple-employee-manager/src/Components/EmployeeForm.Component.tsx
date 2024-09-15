import React, { ChangeEvent, useEffect, useState } from 'react';
import { TextField, Button, MenuItem, Select, InputLabel, FormControl, FormHelperText, Box, Dialog, DialogActions, DialogContent, DialogTitle, SelectChangeEvent, Stack } from '@mui/material';
import Employee from '../Types/Employee';
import Sex from '../Types/Sex';

type EmployeeFormProps = {
  open: boolean;
  employeeToEdit: Employee | null;
  onCancel: () => void;
  onSubmit: (employee: Employee) => void;
};

const EmployeeForm: React.FC<EmployeeFormProps> = ({ open, employeeToEdit, onCancel, onSubmit }) => {
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

  const handleChange = (e: SelectChangeEvent<Sex> | ChangeEvent<HTMLInputElement | HTMLTextAreaElement | { name?: string; value: unknown }>) => {
    const { name, value } = e.target;

    // Remove value from age if not specify
    if(name === 'age' && value === '') {
      setFormData({
        ...formData,
        age: undefined,
      });
      return;
    }

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
      sex: !Object.values(Sex).includes(sex),
      age: age !== undefined && (+age < 18 || +age > 100),
    };

    setErrors(newErrors);

    const hasErrors = Object.values(newErrors).some((error) => error);

    if (!hasErrors) {
      onSubmit(formData);
      handleCancel();
    }
  };

  const handleCancel = () => {
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
    onCancel();
  };

  return (
    <Dialog open={open} onClose={handleCancel}>
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

          <FormControl fullWidth error={errors.sex} required>
            <InputLabel id="sex-label">Sex</InputLabel>
            <Select
              labelId="sex-label"
              name="sex"
              label="Sex"
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
          <Button onClick={handleCancel} color="primary" variant="outlined">
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
