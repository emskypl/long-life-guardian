using Microsoft.EntityFrameworkCore;
using Domain.Diets;

namespace Persistence;

public class AppDbContext(DbContextOptions options) : DbContext(options)
{
    public required DbSet<DietDay> DietDays { get; set; }
    public required DbSet<Meal> Meals { get; set; }
    public required DbSet<Product> Products { get; set; }
}
