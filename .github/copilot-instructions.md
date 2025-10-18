# Health App - AI Coding Assistant Instructions

## Architecture Overview

This is a **Clean Architecture** health/activity tracking application with:

- **.NET 9 Web API** backend using **Entity Framework Core SQLite**
- **React 19 + TypeScript + Vite** frontend with Material-UI
- **CQRS pattern** via MediatR for command/query separation
- **AutoMapper** for object mapping

### Project Structure

- `Domain/` - Core entities (e.g., `Activity.cs`)
- `Application/` - Business logic with Commands/Queries pattern
- `Persistence/` - Data access with EF Core DbContext
- `API/` - Controllers that delegate to MediatR handlers
- `client/` - React frontend consuming the API

## Key Patterns & Conventions

### Backend (C# .NET)

- **MediatR CQRS**: Commands in `Application/Activities/Commands/`, Queries in `Application/Activities/Queries/`
- **Controller Pattern**: All controllers inherit from `BaseApiController` and use `Mediator.Send()`
- **Primary Constructor Injection**: Use `Handler(AppDbContext context)` syntax
- **Required Properties**: Domain entities use `required` keyword for mandatory fields
- **String IDs**: Activities use `Guid.NewGuid().ToString()` for unique identifiers

### Frontend (React/TypeScript)

- **Global Types**: Shared types in `client/src/lib/types/index.d.ts` (note: global `Activity` type)
- **API Integration**: Axios calls to `https://localhost:5002/api/activities`
- **Material-UI Components**: Uses `@mui/material` for UI components

## Development Workflows

### Running the Application

```bash
# Backend (from solution root)
dotnet run --project API

# Frontend (from client/ folder)
npm run dev
```

### Database Management

- **SQLite** database with EF Core migrations in `Persistence/Migrations/`
- **Seeding**: `DbInitializer.SeedData()` creates sample activities with real venues/coordinates
- **Auto-migration**: `Program.cs` runs migrations on startup

### Adding New Features

1. **Domain**: Add/modify entities in `Domain/`
2. **Application**: Create Command/Query handlers in `Application/Activities/`
3. **API**: Add controller actions that delegate to MediatR
4. **Client**: Update TypeScript types and React components

## Project-Specific Details

### Activity Entity Structure

- Location-aware with `City`, `Venue`, `Latitude`, `Longitude`
- Categories: "drinks", "culture", "music", "travel", "film"
- Uses `IsCancelled` boolean for soft deletion pattern

### API Configuration

- **CORS**: Configured for `localhost:3001` (React dev server)
- **Launch Settings**: API runs on `https://localhost:5002`
- **No Authentication**: Currently open endpoints

### Client Configuration

- **Vite + SWC**: Fast development with React Fast Refresh
- **ESLint**: Uses flat config format (`eslint.config.js`)
- **TypeScript**: Strict mode enabled with path mapping

## Important Files to Reference

- `API/Controllers/BaseApiController.cs` - Controller base pattern
- `Application/Activities/Queries/GetActivityList.cs` - CQRS query example
- `Domain/Activity.cs` - Core entity structure
- `client/src/lib/types/index.d.ts` - Shared TypeScript definitions
- `Persistence/DbInitializer.cs` - Sample data structure
