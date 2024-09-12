using Microsoft.EntityFrameworkCore;
using SimpleEmployeeManager.Data;
using SimpleEmployeeManager.Mapping;
using SimpleEmployeeManager.Services;
using SimpleEmployeeManager.Validators;

namespace SimpleEmployeeManager
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.
            builder.Services.AddAutoMapper(typeof(EmployeeMapper));

            builder.Services.AddControllers();
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            builder.Services.AddDbContext<EmployeesDbContext>(
                    option => option.UseSqlServer(builder.Configuration.GetConnectionString("EmployeeConnectionString"))
                );

            builder.Services.AddCors(options =>
            {
                options.AddPolicy("AllowSpecificOrigins",
                    policyBuilder =>
                    {
                        policyBuilder.WithOrigins([.. builder.Configuration.GetSection("AllowedUrls").Get<List<string>>()])
                               .AllowAnyHeader()
                               .AllowAnyMethod();
                    });
            });

            builder.Services.AddScoped<IEmployeesValidator,  EmployeesValidator>();
            builder.Services.AddScoped<IEmployeesService, EmployeesService>();

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseCors("AllowSpecificOrigins");

            app.UseAuthorization();

            app.MapControllers();

            app.Run();
        }
    }
}
