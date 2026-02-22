using API.Extensions;
using API.Middleware;
using Application.Core;
using Azure.Identity;
using Domain.Core;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.RateLimiting;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Persistence;
using System.Text;
using System.Threading.RateLimiting;

var builder = WebApplication.CreateBuilder(args);

// Add Azure Key Vault if running in production
if (builder.Environment.IsProduction())
{
    var keyVaultName = builder.Configuration["KeyVaultName"];
    if (!string.IsNullOrEmpty(keyVaultName))
    {
        var keyVaultUri = new Uri($"https://{keyVaultName}.vault.azure.net/");
        builder.Configuration.AddAzureKeyVault(keyVaultUri, new DefaultAzureCredential());
    }
}

// Add services to the container.
builder.Services.AddControllers();

// Use extension method for application services
builder.Services.AddApplicationServices(builder.Configuration);
builder.Services.AddScoped<TokenService>();
builder.Services.AddScoped<IPasswordHasher, PasswordHasher>();

// Configure CORS with environment-specific allowed origins
var allowedOrigins = new List<string>();

if (builder.Environment.IsDevelopment())
{
    allowedOrigins.AddRange(
    [
        "http://localhost:3000",
        "https://localhost:3000",
        "http://localhost:3001",
        "https://localhost:3001"
    ]);
}

if (builder.Environment.IsProduction())
{
    var azureFrontendUrl = builder.Configuration["AzureFrontendUrl"];
    if (!string.IsNullOrEmpty(azureFrontendUrl))
    {
        allowedOrigins.Add(azureFrontendUrl);
    }
}

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowSpecificOrigins", policy =>
    {
        policy.WithOrigins(allowedOrigins.ToArray())
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

builder.Services.AddRateLimiter(options =>
{
    options.AddFixedWindowLimiter("Fixed", limiterOptions =>
    {
        limiterOptions.Window = TimeSpan.FromSeconds(20);
        limiterOptions.PermitLimit = 5;
        limiterOptions.QueueProcessingOrder = QueueProcessingOrder.OldestFirst;
        limiterOptions.QueueLimit = 5;
    });
});


// JWT Authentication
var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["TokenKey"] ?? throw new InvalidOperationException("TokenKey not found")));
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(opt =>
    {
        opt.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = key,
            ValidateIssuer = false,
            ValidateAudience = false
        };
    });

var app = builder.Build();

// Add global error handling middleware FIRST
app.UseMiddleware<ErrorHandlingMiddleware>();

// Use the CORS policy
app.UseCors("AllowSpecificOrigins");

app.UseRateLimiter();

app.UseAuthentication();
app.UseAuthorization();

// Configure the HTTP request pipeline.
app.MapControllers();

using var scope = app.Services.CreateScope();
var services = scope.ServiceProvider;

try
{
    var context = services.GetRequiredService<AppDbContext>();
    var passwordHasher = services.GetRequiredService<IPasswordHasher>();
    await context.Database.MigrateAsync();
    DbInitializer dbInitializer = new(passwordHasher);
    await dbInitializer.SeedData(context);
}
catch (Exception ex)
{
    var logger = services.GetRequiredService<ILogger<Program>>();
    logger.LogError(ex, "An error occurred during migration");
}


app.Run();
