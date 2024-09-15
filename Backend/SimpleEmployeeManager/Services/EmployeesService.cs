using AutoMapper;
using Microsoft.EntityFrameworkCore;
using SimpleEmployeeManager.Data;
using SimpleEmployeeManager.Models;
using SimpleEmployeeManager.Validators;

namespace SimpleEmployeeManager.Services
{
    public interface IEmployeesService
    {
        IEnumerable<Employee> GetAllEmployees();
        void AddEmployee(Employee employee);
        void UpdateEmployee(Employee employee);
        void DeleteEmployee(Guid employeeId);
        void DeleteManyEmployees(List<Guid> employeeIdsToDelete);
    }
    public class EmployeesService : IEmployeesService
    {
        private readonly EmployeesDbContext _employeesDbContext;
        private readonly IEmployeesValidator _employeesValidator;
        private readonly IMapper _mapper;

        public EmployeesService(EmployeesDbContext employeesDbContext, IEmployeesValidator employeesValidator, IMapper mapper)
        {
            _employeesDbContext = employeesDbContext;
            _employeesValidator = employeesValidator;
            _mapper = mapper;
        }

        public IEnumerable<Employee> GetAllEmployees()
        {
            return _employeesDbContext.Employees.ToList();
        }

        public void AddEmployee(Employee employee)
        {
            ArgumentNullException.ThrowIfNull(employee);

            if (!_employeesValidator.ValidateEmployee(employee, out List<string> errorMessages))
                throw new ArgumentException($"Employee data is not valid. Error list: \n{string.Join($"{Environment.NewLine}", errorMessages)}");

            var existingEmployee = _employeesDbContext.Employees.Find(employee.Id);
            if(existingEmployee != null)
                throw new ArgumentException($"Employee with id {employee.Id} exist into database.");

            _employeesDbContext.Employees.Add(employee);

            _employeesDbContext.SaveChanges();
        }

        public void UpdateEmployee(Employee employee)
        {
            ArgumentNullException.ThrowIfNull(employee);

            if (!_employeesValidator.ValidateEmployee(employee, out List<string> errorMessages))
                throw new ArgumentException($"Employee data is not valid. Error list \n{string.Join($"\t{Environment.NewLine}", errorMessages)}");

            var existingEmployee = _employeesDbContext.Employees.Find(employee.Id) ?? throw new ArgumentException($"Employee with id {employee.Id} not exists into database.");
            
            _mapper.Map(employee, existingEmployee);

            _employeesDbContext.SaveChanges();
        }

        public void DeleteEmployee(Guid employeeId)
        {
            var existingEmployee = _employeesDbContext.Employees.Find(employeeId) ?? throw new ArgumentException($"Employee with id {employeeId} not exists into database.");
            
            _employeesDbContext.Employees.Remove(existingEmployee);
            
            _employeesDbContext.SaveChanges();
        }

        public void DeleteManyEmployees(List<Guid> employeeIdsToDelete)
        {
            List<Guid> notFoundGuids = [];

            foreach (var employeeId in employeeIdsToDelete)
            {
                var existingEmployee = _employeesDbContext.Employees.Find(employeeId);

                if (existingEmployee is null)
                    notFoundGuids.Add(employeeId);
                else
                    _employeesDbContext.Employees.Remove(existingEmployee);
            }

            if (notFoundGuids.Count > 0)
            {
                var changesToRollback = _employeesDbContext.ChangeTracker.Entries();

                foreach (var change in changesToRollback)
                {
                    change.State = EntityState.Unchanged;
                }

                throw new ArgumentException($"Not found employees with ids: \n{string.Join($"\t{Environment.NewLine}", notFoundGuids)}");
            }

            _employeesDbContext.SaveChanges();
        }
    }
}