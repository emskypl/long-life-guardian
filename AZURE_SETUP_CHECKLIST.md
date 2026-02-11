# Quick Azure Setup Checklist

## ✅ What Was Changed

### Frontend (React)
- ✅ Created `.env.development` - localhost API URL
- ✅ Created `.env.production` - Azure API URL (UPDATE THIS!)
- ✅ Created `.env.example` - template file
- ✅ Updated `.gitignore` - excludes .env files from Git
- ✅ Your `apiClient.ts` already uses `VITE_API_URL` ✨

### Backend (.NET API)
- ✅ Added Azure Key Vault packages to `API.csproj`
- ✅ Updated `Program.cs` - reads from Key Vault in production
- ✅ Updated `Program.cs` - CORS supports Azure frontend URL
- ✅ Created `appsettings.Production.json` - production config
- ✅ Updated `appsettings.json` - added KeyVault placeholders

---

## 🎯 What You Need to Do Now

### 1. Update URLs (2 files)

**File 1:** `client/.env.production`
```
VITE_API_URL=https://YOUR-ACTUAL-API-NAME.azurewebsites.net
```
👉 Replace `YOUR-ACTUAL-API-NAME` with your App Service name

**File 2:** `API/appsettings.Production.json`
```json
{
  "KeyVaultName": "longlife-keyvault",
  "AzureFrontendUrl": "https://YOUR-STATIC-WEB-APP-NAME.azurestaticapps.net"
}
```
👉 Replace `YOUR-STATIC-WEB-APP-NAME` with your Static Web App name

### 2. Install Backend Packages

```powershell
cd API
dotnet restore
```

### 3. Configure App Service (one-time setup)

```powershell
# Set your variables
$API_NAME = "longlife-guardian-api"  # Your actual API name
$RESOURCE_GROUP = "longlife-guardian-rg"
$KEYVAULT_NAME = "longlife-keyvault"
$FRONTEND_URL = "https://your-frontend.azurestaticapps.net"

# Configure App Service
az webapp config appsettings set `
  --name $API_NAME `
  --resource-group $RESOURCE_GROUP `
  --settings `
    KeyVaultName="$KEYVAULT_NAME" `
    AzureFrontendUrl="$FRONTEND_URL" `
    ASPNETCORE_ENVIRONMENT="Production"

# Enable managed identity
az webapp identity assign --name $API_NAME --resource-group $RESOURCE_GROUP

# Get principal ID
$principalId = az webapp identity show --name $API_NAME --resource-group $RESOURCE_GROUP --query principalId -o tsv

# Grant Key Vault access
az role assignment create `
  --role "Key Vault Secrets User" `
  --assignee $principalId `
  --scope /subscriptions/92cfc887-f8b3-452e-a3e3-143b0c5fef6e/resourcegroups/$RESOURCE_GROUP/providers/Microsoft.KeyVault/vaults/$KEYVAULT_NAME
```

### 4. Deploy Backend

```powershell
cd API
dotnet publish -c Release -o ./publish
Compress-Archive -Path ./publish/* -DestinationPath ./publish.zip -Force

az webapp deployment source config-zip `
  --name longlife-guardian-api `
  --resource-group longlife-guardian-rg `
  --src ./publish.zip
```

### 5. Deploy Frontend

**Option A: GitHub Actions (Automatic)**
- Just commit and push to GitHub
- Static Web Apps auto-deploys on push

**Option B: Manual**
```powershell
cd client
npm run build
# Upload ./dist folder to Azure Static Web Apps
```

### 6. Test Deployment

```powershell
# Get your API URL
az webapp show --name longlife-guardian-api --resource-group longlife-guardian-rg --query defaultHostName -o tsv

# Test it (should return empty array or diet days)
curl https://longlife-guardian-api.azurewebsites.net/api/dietdays

# View logs if issues
az webapp log tail --name longlife-guardian-api --resource-group longlife-guardian-rg
```

---

## 🔑 Secrets Already in Key Vault

You've already added:
- ✅ `TokenKey` - JWT authentication key

**Still need to add:**
- 📝 `ConnectionStrings--DefaultConnection` - Azure SQL connection string

```powershell
# Add connection string to Key Vault
az keyvault secret set `
  --vault-name longlife-keyvault `
  --name "ConnectionStrings--DefaultConnection" `
  --value "Server=tcp:YOUR-SQL-SERVER.database.windows.net,1433;Database=longlifeguardian-db;User ID=sqladmin;Password=YourPassword;Encrypt=True;"
```

---

## 📦 Files Created

1. `client/.env.development` - Local dev environment
2. `client/.env.production` - Azure production environment ⚠️ UPDATE THIS
3. `client/.env.example` - Template file
4. `API/appsettings.Production.json` - Production config ⚠️ UPDATE THIS
5. `deploy-to-azure.ps1` - Deployment helper script
6. `DEPLOYMENT_GUIDE.md` - Full deployment documentation
7. `AZURE_SETUP_CHECKLIST.md` - This file

---

## ⚡ Quick Deploy Commands

```powershell
# 1. Update .env.production with your API URL
# 2. Update appsettings.Production.json with your values
# 3. Deploy backend
cd API
dotnet publish -c Release -o ./publish
Compress-Archive -Path ./publish/* -DestinationPath ./publish.zip -Force
az webapp deployment source config-zip --name longlife-guardian-api --resource-group longlife-guardian-rg --src ./publish.zip

# 4. Deploy frontend (if manual)
cd ..\client
npm run build
# Upload dist folder to Static Web Apps

# 5. Test
curl https://longlife-guardian-api.azurewebsites.net/api/dietdays
```

---

## 🆘 Common Issues

### Frontend can't reach API
- ❌ Wrong URL in `.env.production`
- ❌ CORS not configured (check `AzureFrontendUrl` in App Service settings)
- ❌ API not deployed or crashed (check logs)

### API can't read secrets
- ❌ Managed identity not enabled
- ❌ Key Vault permissions not granted
- ❌ Wrong KeyVaultName in App Service settings
- ❌ Wait 2-3 min for RBAC propagation

### Database connection failed
- ❌ Connection string not in Key Vault
- ❌ Wrong connection string name (must be `ConnectionStrings--DefaultConnection`)
- ❌ SQL firewall blocking App Service
- ❌ Migrations not run

---

## 🎉 You're All Set!

Your code is now ready for Azure. Just:
1. Update the 2 configuration files marked with ⚠️
2. Run the deployment commands
3. Test your application

Good luck! 🚀
