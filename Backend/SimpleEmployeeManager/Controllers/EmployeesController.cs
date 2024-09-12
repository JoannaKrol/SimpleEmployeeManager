using Microsoft.AspNetCore.Mvc;
using SimpleEmployeeManager.Entites;
using SimpleEmployeeManager.Services;

namespace SimpleEmployeeManager.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EmployeesController : ControllerBase
    {
        private readonly IEmployeesService _employeesService;

        public EmployeesController(IEmployeesService employeesService)
        {
            _employeesService = employeesService;
        }

        [HttpGet]
        public IActionResult GetAllEmployees()
        {
            try
            {
                var employees = _employeesService.GetAllEmployees();
                return Ok(employees);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpPost("AddEmployee")]
        public IActionResult AddEmployee([FromBody] Employee employee)
        {
            try
            {
                _employeesService.AddEmployee(employee);
                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpPost("EditEmployee")]
        public IActionResult UpdateEmployee([FromBody] Employee employee)
        {
            try
            {
                _employeesService.UpdateEmployee(employee);
                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteEmployee(Guid id)
        {
            try
            {
                _employeesService.DeleteEmployee(id);
                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpPost("DeleteEmployees")]
        public IActionResult DeleteEmployees([FromBody] List<Guid> employeeIdsToDelete)
        {
            try
            {
                _employeesService.DeleteManyEmployees(employeeIdsToDelete);
                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
    }
}
