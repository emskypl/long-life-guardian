# Azure Deployment Configuration Scripts

## Step 1: Install Required NuGet Packages

dotnet add API/API.csproj package Azure.Identity
dotnet add API/API.csproj package Azure.Extensions.AspNetCore.Configuration.Secrets

## Step 2: Configure App Service Settings

# Replace these variables with your actual resource names
$API_NAME = "longlife-guardian-api"
$RESOURCE_GROUP = "longlife-guardian-rg"
$KEYVAULT_NAME = "longlife-keyvault"
$SQL_SERVER = "your-sql-server-name"
$DB_NAME = "longlifeguardian-db"
$SQL_ADMIN = "sqladmin"
$SQL_PASSWORD = "YourSecurePassword123!"
$FRONTEND_URL = "https://white-mud-0663bdd10.6.azurestaticapps.net"

# Configure App Service application settings
az webapp config appsettings set `
  --name $API_NAME `
  --resource-group $RESOURCE_GROUP `
  --settings `
    KeyVaultName="$KEYVAULT_NAME" `
    AzureFrontendUrl="$FRONTEND_URL" `
    ASPNETCORE_ENVIRONMENT="Production"

# Configure connection string in App Service (if not using Key Vault)
az webapp config connection-string set `
  --name $API_NAME `
  --resource-group $RESOURCE_GROUP `
  --connection-string-type SQLAzure `
  --settings DefaultConnection="Server=tcp:${SQL_SERVER}.database.windows.net,1433;Database=${DB_NAME};User ID=${SQL_ADMIN};Password=${SQL_PASSWORD};Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;"

# OR store in Key Vault (recommended):
az keyvault secret set `
  --vault-name $KEYVAULT_NAME `
  --name "ConnectionStrings--DefaultConnection" `
  --value "Server=tcp:${SQL_SERVER}.database.windows.net,1433;Database=${DB_NAME};User ID=${SQL_ADMIN};Password=${SQL_PASSWORD};Encrypt=True;"

## Step 3: Enable Managed Identity and Grant Key Vault Access

# Enable system-assigned managed identity
az webapp identity assign `
  --name $API_NAME `
  --resource-group $RESOURCE_GROUP

# Get the principal ID
$PRINCIPAL_ID = az webapp identity show `
  --name $API_NAME `
  --resource-group $RESOURCE_GROUP `
  --query principalId -o tsv

# Grant Key Vault Secrets User role to the App Service
az role assignment create `
  --role "Key Vault Secrets User" `
  --assignee $PRINCIPAL_ID `
  --scope "/subscriptions/92cfc887-f8b3-452e-a3e3-143b0c5fef6e/resourcegroups/$RESOURCE_GROUP/providers/Microsoft.KeyVault/vaults/$KEYVAULT_NAME"

## Step 4: Deploy Backend API

# From the solution root directory
cd API
dotnet publish -c Release -o ./publish

# Deploy to Azure App Service
az webapp deploy `
  --name $API_NAME `
  --resource-group $RESOURCE_GROUP `
  --src-path ./publish.zip `
  --type zip

# OR use zip deployment
Compress-Archive -Path ./publish/* -DestinationPath ./publish.zip -Force
az webapp deployment source config-zip `
  --name $API_NAME `
  --resource-group $RESOURCE_GROUP `
  --src ./publish.zip

## Step 5: Update Frontend Environment for Production

# Update client\.env.production with your actual API URL
# VITE_API_URL=https://longlife-guardian-api.azurewebsites.net

## Step 6: Deploy Frontend to Static Web Apps

# This happens automatically via GitHub Actions
# Just commit and push to your main branch

# Alternatively, deploy manually:
cd client
npm run build

# Install Static Web Apps CLI
npm install -g @azure/static-web-apps-cli

# Deploy
swa deploy ./dist `
  --app-name longlife-frontend `
  --resource-group $RESOURCE_GROUP

## Step 7: Run Database Migrations

# Connect to Azure SQL and run migrations
# Option 1: From local machine (ensure firewall allows your IP)
cd ..
dotnet ef database update --project Persistence --startup-project API

# Option 2: Use Azure Cloud Shell or Kudu console in App Service

## Step 8: Verify Deployment

# Check API health
$API_URL = az webapp show --name $API_NAME --resource-group $RESOURCE_GROUP --query defaultHostName -o tsv
curl "https://${API_URL}/api/dietdays"

# Check logs
az webapp log tail --name $API_NAME --resource-group $RESOURCE_GROUP

Write-Host "Deployment completed!"
Write-Host "API URL: https://${API_URL}"
Write-Host "Update your Static Web App with this URL in .env.production"
