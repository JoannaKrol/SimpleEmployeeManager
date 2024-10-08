﻿using Bogus;
using SimpleEmployeeManager.Enums;
using SimpleEmployeeManager.Models;

namespace SimpleEmployeeManager.Generators
{
    public class EmployeesDataGenerator
    {
        public static List<Employee> GenerateUsers(int numberOfEmployees)
        {
            var userFaker = new Faker<Employee>()
                .RuleFor(u => u.Id, _ => Guid.NewGuid())
                .RuleFor(u => u.FirstName, f => f.Name.FirstName())
                .RuleFor(u => u.LastName, f => f.Name.LastName())
                .RuleFor(u => u.Age, f => f.Random.Int(18, 100).OrNull(f))
                .RuleFor(u => u.Sex, f => f.PickRandom<Sex>());

            return userFaker.Generate(numberOfEmployees);
        }
    }
}
