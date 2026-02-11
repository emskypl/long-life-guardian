# Azure Deployment Guide for Long Life Guardian App

## Overview
This guide helps you deploy your .NET 9 Web API + React application to Azure.

**Architecture:**
- **Backend:** Azure App Service (Web App)
- **Frontend:** Azure Static Web Apps
- **Database:** Azure SQL Database
- **Secrets:** Azure Key Vault

---

## Prerequisites

1. Azure CLI installed and logged in: `az login`
2. Node.js and npm installed
3. .NET 9 SDK installed
4. Azure subscription

---

## Quick Start Deployment

### 1. **Update Configuration Files**

**Frontend** - Update `client/.env.production`:
```
VITE_API_URL=https://YOUR-API-NAME.azurewebsites.net
```

**Backend** - Update `API/appsettings.Production.json`:
```json
{
  "KeyVaultName": "YOUR-KEYVAULT-NAME",
  "AzureFrontendUrl": "https://YOUR-STATIC-WEB-APP.azurestaticapps.net"
}
```

### 2. **Install Azure Packages**

The required packages are already added to `API.csproj`:
- `Azure.Identity` - For managed identity authentication
- `Azure.Extensions.AspNetCore.Configuration.Secrets` - For Key Vault integration

Run:
```bash
dotnet restore
```

### 3. **Configure Azure Resources**

Run the PowerShell script in the root folder:
```powershell
# Edit the variables at the top of the script first
.\deploy-to-azure.ps1
```

Or follow manual steps below.

---

## Manual Deployment Steps

### Part 1: Backend API Deployment

#### A. Restore packages and build
```bash
cd API
dotnet restore
dotnet build -c Release
```

#### B. Deploy to App Service
```bash
# Publish the application
dotnet publish -c Release -o ./publish

# Create zip file
Compress-Archive -Path ./publish/* -DestinationPath ./publish.zip -Force

# Deploy to Azure
az webapp deployment source config-zip \
  --name longlife-guardian-api \
  --resource-group longlife-guardian-rg \
  --src ./publish.zip
```

#### C. Configure App Service Settings
```bash
az webapp config appsettings set \
  --name longlife-guardian-api \
  --resource-group longlife-guardian-rg \
  --settings \
    KeyVaultName="longlife-keyvault" \
    AzureFrontendUrl="https://your-frontend.azurestaticapps.net" \
    ASPNETCORE_ENVIRONMENT="Production"
```

#### D. Grant App Service Access to Key Vault
```bash
# Enable managed identity
az webapp identity assign \
  --name longlife-guardian-api \
  --resource-group longlife-guardian-rg

# Get principal ID
$principalId = az webapp identity show \
  --name longlife-guardian-api \
  --resource-group longlife-guardian-rg \
  --query principalId -o tsv

# Grant Key Vault access
az role assignment create \
  --role "Key Vault Secrets User" \
  --assignee $principalId \
  --scope /subscriptions/YOUR-SUBSCRIPTION-ID/resourcegroups/longlife-guardian-rg/providers/Microsoft.KeyVault/vaults/longlife-keyvault
```

### Part 2: Frontend Deployment

#### A. Build for production
```bash
cd client
npm install
npm run build
```

#### B. Deploy to Static Web Apps

**Option 1: GitHub Actions (Recommended)**
- Azure Static Web Apps automatically creates a GitHub Actions workflow
- Just commit and push to main branch
- Build happens automatically

**Option 2: Manual deployment**
```bash
# Install SWA CLI
npm install -g @azure/static-web-apps-cli

# Deploy
swa deploy ./dist \
  --app-name longlife-frontend \
  --resource-group longlife-guardian-rg
```

### Part 3: Database Migration

```bash
# Allow your IP in Azure SQL firewall first
az sql server firewall-rule create \
  --resource-group longlife-guardian-rg \
  --server your-sql-server \
  --name AllowMyIP \
  --start-ip-address YOUR_IP \
  --end-ip-address YOUR_IP

# Run migrations
cd ..
dotnet ef database update --project Persistence --startup-project API --connection "YOUR_AZURE_SQL_CONNECTION_STRING"
```

---

## Environment Variables Summary

### Frontend (React)
**File:** `client/.env.production`
```
VITE_API_URL=https://longlife-guardian-api.azurewebsites.net
```

### Backend (API)

**App Service Application Settings:**
```
KeyVaultName=longlife-keyvault
AzureFrontendUrl=https://your-frontend.azurestaticapps.net
ASPNETCORE_ENVIRONMENT=Production
```

**Azure Key Vault Secrets:**
```
TokenKey=your-jwt-secret-key-min-32-chars
ConnectionStrings--DefaultConnection=Server=tcp:...
```

---

## Verification Steps

### 1. Check API
```bash
# Get API URL
az webapp show --name longlife-guardian-api \
  --resource-group longlife-guardian-rg \
  --query defaultHostName -o tsv

# Test endpoint
curl https://longlife-guardian-api.azurewebsites.net/api/dietdays
```

### 2. Check Logs
```bash
# Stream logs
az webapp log tail --name longlife-guardian-api \
  --resource-group longlife-guardian-rg

# Enable application logging
az webapp log config --name longlife-guardian-api \
  --resource-group longlife-guardian-rg \
  --application-logging filesystem \
  --level information
```

### 3. Check Static Web App
Visit your Static Web App URL and test the application.

---

## Troubleshooting

### Issue: API returns 401 Unauthorized
- Check Key Vault permissions for managed identity
- Verify TokenKey is set in Key Vault
- Check CORS configuration includes frontend URL

### Issue: Frontend can't connect to API
- Verify VITE_API_URL in .env.production
- Check CORS settings in backend
- Ensure API is running: check App Service logs

### Issue: Database connection failed
- Verify connection string in Key Vault
- Check Azure SQL firewall rules
- Ensure App Service IP is allowed
- Check if managed identity has access to SQL

### Issue: Key Vault access denied
- Wait 2-3 minutes for RBAC permissions to propagate
- Verify role assignment: `az role assignment list`
- Check if Key Vault uses RBAC (not Access Policies)

---

## Cost Optimization

**Free/Low-Cost Options:**
- App Service: F1 (Free) or B1 Basic (~$13/month)
- Azure SQL: Serverless tier (pay per use, ~$5-15/month)
- Static Web Apps: Free tier
- Key Vault: ~$0.03/month for secrets

**Total estimated cost:** $18-28/month

---

## Security Best Practices

1. ✅ Never commit `.env.development` or `.env.production` to Git
2. ✅ Use Key Vault for all secrets in production
3. ✅ Enable managed identity (no passwords in code)
4. ✅ Restrict CORS to specific origins only
5. ✅ Use HTTPS only in production
6. ✅ Rotate JWT TokenKey regularly
7. ✅ Enable Azure SQL firewall rules
8. ✅ Use least-privilege RBAC roles

---

## Next Steps

1. Set up Application Insights for monitoring
2. Configure custom domains for both API and frontend
3. Set up deployment slots (staging/production)
4. Enable automatic backups for Azure SQL
5. Set up Azure DevOps or GitHub Actions CI/CD

---

## Useful Commands

```bash
# View all resources in resource group
az resource list --resource-group longlife-guardian-rg -o table

# Restart App Service
az webapp restart --name longlife-guardian-api --resource-group longlife-guardian-rg

# View Key Vault secrets
az keyvault secret list --vault-name longlife-keyvault -o table

# Get connection string
az sql db show-connection-string --client ado.net \
  --server your-sql-server --name longlifeguardian-db
```

---

## Support

For issues:
1. Check Azure Portal → App Service → Diagnose and solve problems
2. Review Application Insights for errors
3. Check App Service logs
4. Verify all configuration values

---

**Deployment completed!** 🎉

Your application should now be live on Azure.
