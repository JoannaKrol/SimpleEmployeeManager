# SimpleEmployeeManager
A simple application for managing a database of employees via a user interface.

# Main used technologies and tools:
### Backend (ASP.NET Core Web API)
- .NET v8.0 (C# v12.0)
- Entity Framework Core v8
- Libraries: AutoMapper, Bogus
- Visual Studio 2022

### Frontend (create-react-app)
- Node.js v20.15.0
- TypeScript v4.9.5
- React v18.3.1
- Redux v9.1.2
- Material-UI v6.1.0
- Axios v1.7.7
- Visual Studio Code

# How to start
### Backend
1. Build project
2. Into `appsettings.Development.json` configure `EmployeeConnectionString` to your SQL Server instance
3. Make sure you don't have `Employees` database into your SQL Server instance
4. Into Nuget Package Manager Console run command `Add-Migration InitialMigration` and then `Update-Database`

### Frontend
1. Into GUI/simple-employee-manager folder run command `npm install` and then `npm start`