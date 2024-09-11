using Microsoft.EntityFrameworkCore;
using SimpleEmployeeManager.Entites;
using SimpleEmployeeManager.Enums;
using SimpleEmployeeManager.Generators;

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
                    .HasColumnType("char(1)")
                    .HasMaxLength(1)
                    .IsRequired()
                    .HasConversion(
                        v => ((char)v).ToString(),
                        v => (Sex)Enum.Parse(typeof(Sex), v)
                    );
                em.ToTable(t => t.HasCheckConstraint("CK_Employees_Sex", "[Sex] IN ('M', 'F')"));
                em.ToTable(t => t.HasCheckConstraint("CK_Employees_Age", "[Age] BETWEEN 18 AND 100"));
                em.HasData(EmployeesDataGenerator.GenerateUsers(3));
            });

            base.OnModelCreating(modelBuilder);
        }
    }
}
