# Long Life Guardian - Health & Diet Tracking Application

A full-stack health and diet tracking application built with Clean Architecture principles, featuring a .NET 9 Web API backend and a React 19 + TypeScript frontend.

## 🏗️ Architecture Overview

This project follows **Clean Architecture** and **CQRS** patterns for maintainability, testability, and separation of concerns.

### Backend (.NET 9)

```
├── Domain/              # Core business entities (no dependencies)
│   ├── Core/           # Password hashing utilities
│   ├── Login/          # User entity
│   └── Diets/          # DietDay, Meal, Product entities
├── Application/         # Business logic and use cases
│   ├── Core/           # Shared services (TokenService, MappingProfiles)
│   ├── Login/          # Authentication Commands/Queries
│   ├── Diets/          # Diet management Commands/Queries
│   └── Common/         # Shared exceptions, validators, behaviors
├── Persistence/         # Data access layer
│   ├── Migrations/     # EF Core migrations
│   ├── AppDbContext.cs # Database context
│   └── DbInitializer.cs# Seed data
└── API/                # Presentation layer
    ├── Controllers/    # RESTful API endpoints
    ├── Extensions/     # Service registration
    └── Middleware/     # Error handling, logging
```

### Frontend (React 19 + TypeScript)

```
client/src/
├── app/
│   └── layout/         # App shell, NavBar, global components
├── features/           # Feature-based organization
│   ├── landing/        # Landing page, login/register forms
│   ├── dietDays/       # Diet tracking (dashboard, details, form)
│   └── exercise/       # Exercise tracking (placeholder)
├── hooks/              # Custom React hooks
│   ├── useAuth.ts      # Authentication state management
│   └── useDietDays.ts  # Diet days CRUD operations
├── lib/
│   ├── api/            # API client and service modules
│   │   ├── client.ts   # Axios instance with interceptors
│   │   ├── authApi.ts  # Authentication API calls
│   │   └── dietDaysApi.ts # Diet days API calls
│   └── types/          # Global TypeScript definitions
└── main.tsx            # Application entry point
```

## 🚀 Getting Started

### Prerequisites

- .NET 9 SDK
- Node.js 18+ and npm
- SQLite (included with .NET)

### Backend Setup

1. **Restore dependencies:**
   ```bash
   dotnet restore
   ```

2. **Run database migrations:**
   ```bash
   cd API
   dotnet ef database update
   ```

3. **Run the API:**
   ```bash
   dotnet run --project API
   ```
   The API will be available at `https://localhost:5002`

### Frontend Setup

1. **Install dependencies:**
   ```bash
   cd client
   npm install
   ```

2. **Configure environment variables:**
   ```bash
   cp .env.example .env
   # Edit .env if needed (default: VITE_API_URL=https://localhost:5002/api)
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```
   The app will be available at `http://localhost:3001`

## 🔑 Key Features & Patterns

### Backend

#### ✅ Security
- **PBKDF2 password hashing** with 100,000 iterations (OWASP recommended)
- **JWT authentication** with Bearer token support
- **Custom exception types** for proper HTTP status codes
- **Global error handling middleware** for consistent API responses

#### ✅ CQRS Pattern
All business operations are organized as Commands (write) and Queries (read):
```csharp
// Example Query
public class GetDietDaysList
{
    public class Query : IRequest<List<DietDay>> { }
    public class Handler : IRequestHandler<Query, List<DietDay>> { }
}

// Example Command
public class CreateDietDay
{
    public class Command : IRequest<string> { }
    public class Handler : IRequestHandler<Command, string> { }
}
```

#### ✅ Validation
- **FluentValidation** for declarative validation rules
- **MediatR Pipeline Behavior** for automatic validation before handlers execute
- Validators for all commands/queries:
  - `RegisterValidator` - User registration validation
  - `LoginValidator` - Login credentials validation
  - `CreateDietDayValidator` - Diet day creation validation
  - `EditDietDayValidator` - Diet day update validation

#### ✅ Dependency Injection
- **Extension methods** for clean service registration (`ServiceCollectionExtensions`)
- **Primary constructor injection** for minimal boilerplate
- **Scoped lifetime** for DbContext and application services

### Frontend

#### ✅ Clean Code Practices
- **Custom hooks** for reusable logic (`useAuth`, `useDietDays`)
- **Centralized API client** with Axios interceptors
- **Type-safe API calls** with TypeScript interfaces
- **Feature-based organization** for scalability

#### ✅ State Management
```typescript
// Example: useAuth hook
const { user, isAuthenticated, login, register, logout } = useAuth()

// Example: useDietDays hook
const { dietDays, createDietDay, updateDietDay, deleteDietDay } = useDietDays()
```

#### ✅ API Integration
- **Automatic token injection** via request interceptors
- **Global error handling** via response interceptors
- **Environment-based configuration** using Vite env variables

## 📚 API Endpoints

### Authentication
- `POST /api/login/register` - Register new user
- `POST /api/login/login` - Login user

### Diet Days
- `GET /api/dietdays` - Get all diet days
- `GET /api/dietdays/{id}` - Get diet day by ID
- `POST /api/dietdays` - Create new diet day
- `PUT /api/dietdays` - Update existing diet day
- `DELETE /api/dietdays/{id}` - Delete diet day

## 🧪 Testing

### Backend Tests
```bash
dotnet test
```
*(Test infrastructure to be added)*

### Frontend Tests
```bash
cd client
npm test
```
*(Test infrastructure to be added)*

## 📦 Technologies

### Backend
- .NET 9
- Entity Framework Core 9
- SQLite
- MediatR (CQRS)
- AutoMapper
- FluentValidation
- JWT Authentication

### Frontend
- React 19
- TypeScript 5
- Vite 7
- Material-UI 7
- Axios
- date-fns

## 🔧 Development

### Code Structure Conventions

**Backend:**
- Use primary constructor injection
- All properties use `required` keyword where applicable
- String-based GUIDs for entity IDs
- Nullable navigation properties for optional relationships
- Custom exceptions for domain-specific errors

**Frontend:**
- Feature-based folder organization
- Custom hooks for complex state logic
- Type-safe API calls with proper error handling
- Material-UI components for consistent UI

### Adding New Features

1. **Backend:**
   - Create entity in `Domain/`
   - Add Command/Query handlers in `Application/`
   - Create validator for each command/query
   - Add controller endpoint in `API/`
   - Run migration: `dotnet ef migrations add <name>`

2. **Frontend:**
   - Add TypeScript types in `lib/types/`
   - Create API service in `lib/api/`
   - Add custom hook if needed
   - Create feature components in `features/`

## 🐛 Known Issues & Improvements

### To Be Implemented
- [ ] Repository pattern for better data access abstraction
- [ ] Domain logic in entities (currently anemic domain model)
- [ ] Explicit EF Core entity configurations
- [ ] Unit tests for backend handlers
- [ ] Integration tests for API endpoints
- [ ] React component tests
- [ ] Error boundary components
- [ ] Input validation library (zod/yup)
- [ ] Code-splitting for bundle size optimization

### Recent Improvements
- ✅ Replaced SHA256 with PBKDF2 password hashing
- ✅ Registered ErrorHandlingMiddleware
- ✅ Added FluentValidation validators
- ✅ Removed try-catch blocks from controllers
- ✅ Created custom exception types
- ✅ Centralized API client with interceptors
- ✅ Created useAuth and useDietDays hooks
- ✅ Refactored App.tsx (removed 150+ lines)

## 📝 License

This project is for educational purposes.

## 👥 Authors

- **emskypl** - Initial work and ongoing development
