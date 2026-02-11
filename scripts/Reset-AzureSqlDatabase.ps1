# Azure SQL Database Reset Script
# This script drops and recreates your Azure SQL Database to fix migration issues

param(
    [Parameter(Mandatory=$true)]
    [string]$ResourceGroupName,
    
    [Parameter(Mandatory=$true)]
    [string]$ServerName,
    
    [Parameter(Mandatory=$true)]
    [string]$DatabaseName,
    
    [Parameter(Mandatory=$false)]
    [string]$Edition = "Basic",
    
    [Parameter(Mandatory=$false)]
    [string]$ServiceObjective = "Basic"
)

Write-Host "======================================" -ForegroundColor Cyan
Write-Host "Azure SQL Database Reset Utility" -ForegroundColor Cyan
Write-Host "======================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "This will DELETE and RECREATE the database:" -ForegroundColor Yellow
Write-Host "  Resource Group: $ResourceGroupName" -ForegroundColor White
Write-Host "  Server: $ServerName" -ForegroundColor White
Write-Host "  Database: $DatabaseName" -ForegroundColor White
Write-Host ""
Write-Warning "ALL DATA WILL BE LOST!"
Write-Host ""

$confirmation = Read-Host "Type 'YES' to continue"
if ($confirmation -ne 'YES') {
    Write-Host "Operation cancelled." -ForegroundColor Red
    exit
}

Write-Host ""
Write-Host "Checking Azure CLI login..." -ForegroundColor Cyan
try {
    $account = az account show 2>$null | ConvertFrom-Json
    Write-Host "Logged in as: $($account.user.name)" -ForegroundColor Green
} catch {
    Write-Host "Not logged in to Azure CLI. Logging in..." -ForegroundColor Yellow
    az login
}

Write-Host ""
Write-Host "Step 1: Deleting database '$DatabaseName'..." -ForegroundColor Cyan
try {
    az sql db delete `
        --resource-group $ResourceGroupName `
        --server $ServerName `
        --name $DatabaseName `
        --yes `
        --no-wait
    
    Write-Host "Delete operation initiated. Waiting for completion..." -ForegroundColor Yellow
    Start-Sleep -Seconds 10
    Write-Host "Database deleted successfully." -ForegroundColor Green
} catch {
    Write-Host "Error deleting database: $_" -ForegroundColor Red
    Write-Host "Continuing anyway..." -ForegroundColor Yellow
}

Write-Host ""
Write-Host "Step 2: Creating new database '$DatabaseName'..." -ForegroundColor Cyan
try {
    az sql db create `
        --resource-group $ResourceGroupName `
        --server $ServerName `
        --name $DatabaseName `
        --edition $Edition `
        --service-objective $ServiceObjective
    
    Write-Host "Database created successfully." -ForegroundColor Green
} catch {
    Write-Host "Error creating database: $_" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "======================================" -ForegroundColor Green
Write-Host "Database Reset Complete!" -ForegroundColor Green
Write-Host "======================================" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "1. Commit and push your code changes to GitHub" -ForegroundColor White
Write-Host "2. Redeploy your App Service (or wait for CI/CD)" -ForegroundColor White
Write-Host "3. Migrations will run automatically on startup" -ForegroundColor White
Write-Host ""
Write-Host "To monitor deployment:" -ForegroundColor Cyan
Write-Host "  az webapp log tail --name YOUR_APP_NAME --resource-group $ResourceGroupName" -ForegroundColor White
Write-Host ""
