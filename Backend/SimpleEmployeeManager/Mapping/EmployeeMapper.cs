using AutoMapper;
using SimpleEmployeeManager.Entites;

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
