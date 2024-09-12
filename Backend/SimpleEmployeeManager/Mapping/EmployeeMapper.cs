using AutoMapper;
using SimpleEmployeeManager.Models;

namespace SimpleEmployeeManager.Mapping
{
    public class EmployeeMapper : Profile
    {
        public EmployeeMapper()
        {
            CreateMap<Employee, Employee>();
        }
    }
}
