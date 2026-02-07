# Long Life Guardian App - AI Coding Assistant Instructions

## Architecture Overview

This is a **Clean Architecture** health/diet tracking application with:

- **.NET 9 Web API** backend using **Entity Framework Core SQLite**
- **React 19 + TypeScript + Vite** frontend with Material-UI
- **CQRS pattern** via MediatR for command/query separation
- **AutoMapper** for object mapping
- **Full CRUD operations** for diet day management

### Project Structure

- `Domain/Diets/` - Core entities: `DietDay.cs`, `Meal.cs`, `Product.cs`
- `Application/Diets/` - Business logic with Commands/Queries pattern
  - `Commands/` - CreateDietDay, EditDietDay, DeleteDietDay
  - `Queries/` - GetDietDaysList, GetDietDetails
- `Persistence/` - Data access with EF Core DbContext and migrations
- `API/Controllers/` - RESTful controllers that delegate to MediatR handlers
- `client/src/` - React frontend with feature-based organization
  - `features/dietDays/` - Dashboard, Details, and Form components
  - `app/layout/` - App shell, NavBar, and global styles
  - `lib/types/` - Global TypeScript type definitions

## Key Patterns & Conventions

### Backend (C# .NET)

- **MediatR CQRS**: Commands in `Application/Diets/Commands/`, Queries in `Application/Diets/Queries/`
- **Controller Pattern**: All controllers inherit from `BaseApiController` and use `Mediator.Send()`
- **RESTful API**: Full CRUD (GET, POST, PUT, DELETE) endpoints
- **Primary Constructor Injection**: Use `Handler(AppDbContext context)` syntax
- **Required Properties**: Domain entities use `required` keyword for mandatory fields
- **String IDs**: All entities (DietDay, Meal, Product) use `Guid.NewGuid().ToString()` for unique identifiers
- **Nullable Navigation Properties**: DietDay meals are nullable (`Meal?`) to support optional meals

### Frontend (React/TypeScript)

- **Feature-Based Organization**: Components grouped by feature in `features/dietDays/`
  - `dashboard/` - DietDayDashboard, DietDayList, MealsTable
  - `details/` - DietDayDetails, DietDayDetailsTable
  - `form/` - DietDayForm
- **Global Types**: Shared types in `client/src/lib/types/index.d.ts` (DietDay, Meal, Product)
- **State Management**: React hooks in App.tsx (useState, useEffect) for managing diet days and UI state
- **API Integration**: Axios calls to `https://localhost:5002/api/dietdays`
- **Material-UI Components**: `@mui/material` for layout, forms, tables
- **Data Visualization**: `@mui/x-charts` for BarChart, PieChart, and Gauge components

## Development Workflows

### Running the Application

```bash
# Backend (from solution root)
dotnet run --project API
# Runs on https://localhost:5002

# Frontend (from client/ folder)
npm run dev
# Runs on http://localhost:3001
```

### Database Management

- **SQLite** database with EF Core migrations in `Persistence/Migrations/`
- **Seeding**: `DbInitializer.SeedData()` creates sample diet days with realistic meal plans and nutritional data
- **Auto-migration**: `Program.cs` runs `context.Database.MigrateAsync()` on startup
- **Migrations**: Located in `Persistence/Migrations/` including Product and Meal entity relationships

### Adding New Features

1. **Domain**: Add/modify entities in `Domain/Diets/`
2. **Application**: Create Command/Query handlers in `Application/Diets/Commands|Queries/`
3. **API**: Add controller actions in `DietDaysController.cs` that delegate to MediatR
4. **Client**:
   - Update TypeScript types in `lib/types/index.d.ts`
   - Create components in `features/dietDays/{dashboard|details|form}/`
   - Update state management in `App.tsx` if needed

## Project-Specific Details

### Domain Model Structure

**DietDay Entity** (`Domain/Diets/DietDay.cs`):

- `Id` (string, GUID) - Primary key
- `Date` (DateTime) - Date of the diet day
- `Breakfast`, `Lunch`, `Dinner`, `Snacks` (Meal?, nullable) - Four meal slots
- `ProteinTarget`, `CarbsTarget`, `FatTarget`, `CaloriesTarget` (int) - Daily nutritional targets

**Meal Entity** (`Domain/Diets/Meal.cs`):

- `Id` (string, GUID) - Primary key
- `Name` (required string) - Meal name (e.g., "Breakfast", "Lunch")
- `Products` (required List<Product>) - Collection of products in the meal

**Product Entity** (`Domain/Diets/Product.cs`):

- `Id` (string, GUID) - Primary key
- `Name` (required string) - Product name (e.g., "Oatmeal", "Chicken Salad")
- `Calories`, `Protein`, `Carbs`, `Fat` (int) - Nutritional values per serving

### API Endpoints (DietDaysController)

- `GET /api/dietdays` - Returns list of all diet days
- `GET /api/dietdays/{id}` - Returns single diet day by ID
- `POST /api/dietdays` - Creates new diet day, returns ID
- `PUT /api/dietdays` - Updates existing diet day, returns 204 NoContent
- `DELETE /api/dietdays/{id}` - Deletes diet day, returns 200 OK

### Frontend Component Structure

**App.tsx** (`client/src/app/layout/App.tsx`):

- Main application container with state management
- Manages `dietDays` array, `selectedDietDay`, and `editMode` states
- Handles CRUD operations: select, create, edit, delete diet days
- Uses Axios for API calls to backend
- Props drilling to DietDaysDashboard component

**DietDaysDashboard** (`features/dietDays/dashboard/DietDayDashboard.tsx`):

- Main dashboard container orchestrating list, details, and form views
- Conditional rendering based on `editMode` and `selectedDietDay` states
- Displays DietDayList, DietDayDetails, or DietDayForm based on user actions

**DietDayList** (`features/dietDays/dashboard/DietDayList.tsx`):

- Table view of all diet days
- Includes MealsTable component for each diet day row
- Action buttons for view details, edit, delete operations

**MealsTable** (`features/dietDays/dashboard/MealsTable.tsx`):

- Displays meal breakdown (Breakfast, Lunch, Dinner, Snacks) for a diet day
- Shows nutritional totals and targets

**DietDayDetails** (`features/dietDays/details/DietDayDetails.tsx`):

- Detailed view of a single diet day with data visualizations
- Uses DietDayDetailsTable for each meal's product breakdown
- Includes **@mui/x-charts** components:
  - **Gauge** - Shows calorie progress (actual/target) with percentage
  - **BarChart** - Displays macronutrient targets vs current (Carbs, Protein, Fat)
  - **PieChart** (if implemented) - Nutritional breakdown visualization

**DietDayDetailsTable** (`features/dietDays/details/DietDayDetailsTable.tsx`):

- Reusable table component showing products in a specific meal
- Displays Product name, Calories, Carbs, Protein, Fat columns
- All number columns set to equal width (100px) for consistency

**DietDayForm** (`features/dietDays/form/DietDayForm.tsx`):

- Form for creating/editing diet days
- Material-UI form components with controlled inputs
- Handles form submission and validation

### Data Visualization Details

**Gauge Component** (in DietDayDetails.tsx):

- Displays calorie progress as percentage: `(actualCalories / targetCalories) * 100`
- Customizable label via `text` prop: `text={({ value }) => \`${actual}/${target}\`}`
- Dynamic color: Green (`#52b202`) when under target, Red (`#ff0000`) when over
- Custom styling via `sx` prop with `gaugeClasses` selectors:
  - `gaugeClasses.valueText` - Center label styling (fontSize, color)
  - `gaugeClasses.valueArc` - Filled progress arc
  - `gaugeClasses.referenceArc` - Background arc

**BarChart Component**:

- Compares current vs target values for Carbs, Protein, Fat
- Stacked or grouped bar configuration
- X-axis labels: ['Carbs', 'Protein', 'Fat']
- Two data series: Current (actual consumed) and Target (goals)

### TypeScript Type Definitions

Located in `client/src/lib/types/index.d.ts`:

```typescript
type DietDay = {
	id: string
	date: string
	breakfast: Meal
	lunch: Meal
	dinner: Meal
	snacks: Meal
	proteinTarget: number
	carbsTarget: number
	fatTarget: number
	caloriesTarget: number
}

type Meal = {
	id: string
	name: string
	products: Product[]
}

type Product = {
	id: string
	name: string
	calories: number
	protein: number
	carbs: number
	fat: number
}
```

**Note**: Types are declared globally (no import required) and match C# domain models with camelCase naming.

### API Configuration

- **CORS**: Configured for `localhost:3000`, `localhost:3001` (React dev server, http and https)
- **Launch Settings**: API runs on `https://localhost:5002`
- **No Authentication**: Currently open endpoints
- **Database Connection**: SQLite via connection string in `appsettings.json`
- **Auto Migration**: Database migrations run automatically on application startup

### Client Configuration

- **Vite + SWC**: Fast development with React Fast Refresh (`@vitejs/plugin-react-swc`)
- **ESLint**: Uses flat config format (`eslint.config.js`)
- **TypeScript**: Strict mode enabled with path mapping
- **Key Dependencies**:
  - React 19.1.1
  - Material-UI 7.3.4 (`@mui/material`, `@mui/icons-material`)
  - MUI X-Charts 8.27.0 (`@mui/x-charts`) - For data visualization
  - Axios 1.12.2 - For HTTP requests
  - Emotion (`@emotion/react`, `@emotion/styled`) - CSS-in-JS for MUI

## Important Files to Reference

- `API/Controllers/BaseApiController.cs` - Controller base pattern
- `API/Controllers/DietDaysController.cs` - Full CRUD REST API implementation
- `Application/Diets/Queries/GetDietDaysList.cs` - CQRS query example
- `Application/Diets/Commands/CreateDietDay.cs` - CQRS command example
- `Domain/Diets/DietDay.cs` - Main entity structure
- `Domain/Diets/Meal.cs` - Meal entity with Products collection
- `Domain/Diets/Product.cs` - Product entity with nutritional data
- `client/src/lib/types/index.d.ts` - Shared TypeScript global type definitions
- `client/src/app/layout/App.tsx` - Main application component with state management
- `client/src/features/dietDays/dashboard/DietDayDashboard.tsx` - Dashboard orchestrator
- `client/src/features/dietDays/details/DietDayDetails.tsx` - Details view with charts
- `client/src/features/dietDays/form/DietDayForm.tsx` - Create/Edit form
- `Persistence/DbInitializer.cs` - Sample data seeding structure
- `Persistence/Migrations/` - EF Core migration history
