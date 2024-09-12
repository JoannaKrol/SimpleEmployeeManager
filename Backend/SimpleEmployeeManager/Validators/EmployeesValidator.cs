using Microsoft.IdentityModel.Tokens;
using SimpleEmployeeManager.Entites;

namespace SimpleEmployeeManager.Validators
{
    public interface IEmployeesValidator
    {
        bool ValidateEmployee(Employee employee, out List<string> errorMessages );
    }

    public class EmployeesValidator : IEmployeesValidator
    {
        public bool ValidateEmployee(Employee employee, out List<string> errorMessages)
        {
            errorMessages = new();

            if (employee.FirstName.IsNullOrEmpty())
                errorMessages.Add("FirstName must by specify");
            else if (employee.FirstName.Length > 256)
                errorMessages.Add("Max length of FirstName is 256 characters");

            if (employee.LastName.IsNullOrEmpty())
                errorMessages.Add("LastName must by specify");
            else if (employee.LastName.Length > 256)
                errorMessages.Add("Max length of LastName is 256 characters");

            if (employee.Age < 18 || employee.Age > 100)
                errorMessages.Add("Age must by between 18 and 100");

            return !errorMessages.Any();
        }

    }
}
