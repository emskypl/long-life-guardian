using System;
using Microsoft.EntityFrameworkCore;
using Model;

namespace Persistence;

public class AppDbContext(DbContextOptions options) : DbContext
{
    public required DbSet<Activity> Activities { get; set; }
}
