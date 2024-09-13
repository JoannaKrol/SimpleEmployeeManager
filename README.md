# SimpleEmployeeManager
A simple application for managing a database of employees via a user interface.

# Used technologies:
- Node.js v20.15.0
- .NET 8.0

# How to start
1. Build backend project
2. Into `appsettings.Development.json` configure `EmployeeConnectionString` to your local SQL Server
3. Into Nuget Packages Manager console run command `Add-Migration InitialMigration`
4. Into GUI/simple-employee-manager folder run command `npm install` and then `npm start`