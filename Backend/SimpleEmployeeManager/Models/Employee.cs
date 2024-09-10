using SimpleEmployeeManager.Enums;

namespace SimpleEmployeeManager.Entites
{
    public class Employee
    {
        public Guid Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public int? Age { get; set; }
        public Sex Sex { get; set; }
    }
}
