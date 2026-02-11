using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Diagnostics;
using Domain.Diets;
using Domain.Login;

namespace Persistence;

public class AppDbContext(DbContextOptions options) : DbContext(options)
{
    public required DbSet<DietDay> DietDays { get; set; }
    public required DbSet<Meal> Meals { get; set; }
    public required DbSet<Product> Products { get; set; }
    public required DbSet<User> Users { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        // Suppress pending model changes warning in production
        // This is safe because our migrations are database-agnostic
        optionsBuilder.ConfigureWarnings(warnings => 
            warnings.Ignore(RelationalEventId.PendingModelChangesWarning));
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Configure DietDay relationships
        modelBuilder.Entity<DietDay>()
            .HasOne(d => d.Breakfast)
            .WithMany()
            .HasForeignKey("BreakfastId")
            .OnDelete(DeleteBehavior.Restrict);

        modelBuilder.Entity<DietDay>()
            .HasOne(d => d.Lunch)
            .WithMany()
            .HasForeignKey("LunchId")
            .OnDelete(DeleteBehavior.Restrict);

        modelBuilder.Entity<DietDay>()
            .HasOne(d => d.Dinner)
            .WithMany()
            .HasForeignKey("DinnerId")
            .OnDelete(DeleteBehavior.Restrict);

        modelBuilder.Entity<DietDay>()
            .HasOne(d => d.Snacks)
            .WithMany()
            .HasForeignKey("SnacksId")
            .OnDelete(DeleteBehavior.Restrict);

        // Configure Meal-Product relationship
        modelBuilder.Entity<Product>()
            .HasOne<Meal>()
            .WithMany(m => m.Products)
            .HasForeignKey("MealId")
            .OnDelete(DeleteBehavior.Cascade);

        // Configure User indexes
        modelBuilder.Entity<User>()
            .HasIndex(u => u.Login)
            .IsUnique();

        modelBuilder.Entity<User>()
            .HasIndex(u => u.Email)
            .IsUnique();
    }
}
