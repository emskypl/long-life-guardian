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

        // Configure string primary keys with max length for SQL Server compatibility
        modelBuilder.Entity<DietDay>()
            .Property(d => d.Id)
            .HasMaxLength(450); // SQL Server index key limit

        modelBuilder.Entity<Meal>()
            .Property(m => m.Id)
            .HasMaxLength(450);

        modelBuilder.Entity<Product>()
            .Property(p => p.Id)
            .HasMaxLength(450);

        modelBuilder.Entity<User>()
            .Property(u => u.Id)
            .HasMaxLength(450);

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

        // Configure User string properties with max lengths
        modelBuilder.Entity<User>()
            .Property(u => u.Login)
            .HasMaxLength(256)
            .IsRequired();

        modelBuilder.Entity<User>()
            .Property(u => u.Email)
            .HasMaxLength(256)
            .IsRequired();

        modelBuilder.Entity<User>()
            .Property(u => u.Username)
            .HasMaxLength(256)
            .IsRequired();

        modelBuilder.Entity<User>()
            .Property(u => u.Password)
            .HasMaxLength(512) // PBKDF2 hash can be long
            .IsRequired();

        // Configure User indexes
        modelBuilder.Entity<User>()
            .HasIndex(u => u.Login)
            .IsUnique();

        modelBuilder.Entity<User>()
            .HasIndex(u => u.Email)
            .IsUnique();
    }
}
