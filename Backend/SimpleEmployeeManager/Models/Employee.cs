﻿using SimpleEmployeeManager.Enums;

namespace SimpleEmployeeManager.Models
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
