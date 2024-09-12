using Microsoft.EntityFrameworkCore;
using SimpleEmployeeManager.Enums;
using SimpleEmployeeManager.Generators;
using SimpleEmployeeManager.Models;

namespace SimpleEmployeeManager.Data
{
    public class EmployeesDbContext(DbContextOptions<EmployeesDbContext> options) : DbContext(options)
    {
        public DbSet<Employee> Employees { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Employee>(em =>
            {
                em.Property(c => c.FirstName).HasColumnType("varchar(256)").IsRequired();
                em.Property(c => c.LastName).HasColumnType("varchar(256)").IsRequired();
                em.Property(c => c.Sex)
                    .HasColumnType("char(6)")
                    .HasMaxLength(1)
                    .IsRequired()
                    .HasConversion(new SexConverter());
                em.ToTable(t => t.HasCheckConstraint("CK_Employees_Sex", "[Sex] IN ('Male', 'Female')"));
                em.ToTable(t => t.HasCheckConstraint("CK_Employees_Age", "[Age] BETWEEN 18 AND 100"));
                em.HasData(EmployeesDataGenerator.GenerateUsers(3));
            });

            base.OnModelCreating(modelBuilder);
        }
    }
}
