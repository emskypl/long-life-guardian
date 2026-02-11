using Application.Diets.Queries;
using Application.Common.Behaviors;
using Application.Core;
using FluentValidation;
using Microsoft.EntityFrameworkCore;
using Persistence;
using Domain.Core;

namespace API.Extensions;

public static class ServiceCollectionExtensions
{
    public static IServiceCollection AddApplicationServices(this IServiceCollection services, IConfiguration configuration)
    {
        services.AddDbContext<AppDbContext>(opt =>
        {
            var connectionString = configuration.GetConnectionString("DefaultConnection");

            // Use SQL Server in production, SQLite in development
            if (configuration["ASPNETCORE_ENVIRONMENT"] == "Production")
            {
                opt.UseSqlServer(connectionString);
            }
            else
            {
                opt.UseSqlite(connectionString);
            }
        });

        services.AddCors();

        services.AddMediatR(cfg =>
        {
            cfg.RegisterServicesFromAssemblyContaining<GetDietDaysList.Handler>();
            cfg.AddOpenBehavior(typeof(ValidationBehavior<,>));
        });

        services.AddAutoMapper(typeof(MappingProfiles).Assembly);
        services.AddValidatorsFromAssemblyContaining<GetDietDaysList.Handler>();

        // Register application services
        services.AddScoped<IPasswordHasher, PasswordHasher>();

        return services;
    }
}