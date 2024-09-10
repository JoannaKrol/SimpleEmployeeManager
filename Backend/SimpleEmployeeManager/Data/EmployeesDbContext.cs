using Microsoft.EntityFrameworkCore;
using SimpleEmployeeManager.Entites;
using SimpleEmployeeManager.Enums;

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
                        v => v.ToString(),
                        v => (Sex)Enum.Parse(typeof(Sex), v)
                    );
                em.ToTable(t => t.HasCheckConstraint("CK_Employees_Sex", "[Sex] IN ('M', 'F')"));
                em.ToTable(t => t.HasCheckConstraint("CK_Employees_Age", "[Age] BEWTEEN 18 AND 100"));
            });

            base.OnModelCreating(modelBuilder);
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer("Server=(localdb);Database=EmployeesDb;Trusted_Connection=True;");
        }
    }
}
