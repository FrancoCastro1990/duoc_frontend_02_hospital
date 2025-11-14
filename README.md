# Hospital Dashboard

A professional medical dashboard application built with React 19, TypeScript, and Tailwind CSS v4. The project emphasizes a calming, professional aesthetic with pastel colors (lavender blue and sage green) appropriate for healthcare environments.

## 🚀 Technologies

- **React 19** - Latest React with modern features
- **TypeScript** - Strict typing for better code quality
- **TanStack Query (React Query) v5** - Server state management with automatic caching
- **MSW (Mock Service Worker)** - API mocking for development and testing
- **Tailwind CSS v4** - CSS-first configuration for theming
- **Vite** - Fast build tool and dev server
- **React Router** - Client-side routing
- **Lucide React** - Beautiful icon library

## 📋 Table of Contents

- [Getting Started](#-getting-started)
- [Architecture](#-architecture)
- [Feature Structure](#-feature-structure)
- [Code Conventions](#-code-conventions)
- [Design System](#-design-system)
- [Development Workflow](#-development-workflow)

## 🏃 Getting Started

### Prerequisites

- Node.js 20.19+ or 22.12+
- npm 10+

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm preview

# Run linter
npm run lint
```

The application will be available at `http://localhost:5173`

## 🏗 Architecture

This project follows **Screaming Architecture** principles where the codebase organization screams "Hospital Dashboard" rather than technical frameworks. Features are self-contained, domain-focused modules with clear boundaries.

### Core Principles

1. **Feature-based organization** - Code organized by business domain (patients, landing, etc.)
2. **Separation of concerns** - Types, components, services, hooks, and pages in dedicated folders
3. **Dependency injection** - Services injected into hooks for better testability
4. **One file = One responsibility** - Each file contains a single component, hook, or utility
5. **Centralized types** - All TypeScript interfaces in dedicated `types/` folder

### Project Structure

```
src/
├── features/                    # Feature modules (domain-driven)
│   ├── landing/                 # Landing page feature
│   ├── patients/                # Patient management feature
│   └── shared/                  # Shared components and utilities
├── lib/                         # Shared libraries and configuration
│   └── queryClient.ts           # React Query configuration
├── mocks/                       # MSW (Mock Service Worker) handlers
│   ├── handlers/                # API mock handlers by domain
│   │   ├── patients.ts
│   │   ├── landing.ts
│   │   └── index.ts
│   └── browser.ts               # Browser worker setup
├── main.tsx                     # Application entry point
└── index.css                    # Tailwind v4 configuration + theme
```

## 📁 Feature Structure

Each feature follows a consistent, predictable structure:

```
src/features/[feature-name]/
├── types/                       # (Optional) TypeScript interfaces & types
│   └── index.ts
├── components/                  # (Optional) Feature-specific components
│   ├── Component1.tsx           # One component per file
│   ├── Component2.tsx
│   └── index.ts                 # Barrel exports
├── utils/                       # (Optional) Pure utility functions
│   └── utility.ts
├── services/                    # (Optional) Business logic & data operations
│   └── FeatureService.ts        # HTTP operations (no types)
├── queries/                     # (Optional) React Query configuration
│   ├── keys.ts                  # Query key factory
│   └── options.ts               # Query options with DI
├── hooks/                       # (Optional) React hooks with state management
│   └── useFeature.ts            # Uses React Query + service (DI)
├── pages/                       # (Required) Page-level components
│   └── Feature.tsx              # Composition only, instantiates services
└── index.ts                     # (Required) Public API (barrel exports)
```

### Folder Guidelines

**Required folders:**
- `pages/` - Every feature must have at least one page component
- `index.ts` - Barrel export for the feature's public API

**Optional folders** (create only when needed):
- `types/` - Only if the feature has TypeScript interfaces/types
- `components/` - Only if the feature has reusable components
- `utils/` - Only if the feature has utility functions
- `services/` - Only if the feature needs data operations or business logic
- `queries/` - Only if the feature uses React Query (recommended for data fetching)
- `hooks/` - Only if the feature needs custom React hooks (data fetching OR UI logic)

**Hook Types:**
- **Data fetching hooks** - Use React Query (`useQuery`, `useMutation`)
- **UI logic hooks** - Extract search, filtering, pagination, form state
- **One file = One hook** - Separate data fetching from UI logic into different files
- Example: `usePatients.ts` (data) + `usePatientsSearch.ts` (search logic)

**Examples:**
- A simple static page might only have `pages/` and `index.ts`
- A feature with data fetching would add `types/`, `services/`, `queries/`, `hooks/`
- A feature with reusable UI elements would add `components/`
- A feature with search would add an additional hook file for search logic

### Example: Patients Feature

```
src/features/patients/
├── types/
│   └── index.ts                 # Patient, IPatientsService, component props
├── components/
│   ├── PatientStatCard.tsx      # Reusable stat card
│   ├── LoadingState.tsx         # Loading UI component
│   ├── SearchBar.tsx            # Search input component
│   └── index.ts
├── utils/
│   └── formatters.ts            # formatDate() utility
├── services/
│   └── PatientsService.ts       # HTTP operations (fetch('/api/patients'))
├── queries/                      # React Query configuration
│   ├── keys.ts                  # patientsKeys factory
│   └── options.ts               # createPatientsQueryOptions(service)
├── hooks/
│   ├── usePatients.ts           # Data fetching (React Query) - ONE file
│   └── usePatientsSearch.ts     # Search/filter logic - SEPARATE file
├── pages/
│   └── Patients.tsx             # Main page (uses both hooks + components)
└── index.ts                     # Exports: Patients, usePatients, queries, types

# MSW Handler:
src/mocks/handlers/patients.ts   # Intercepts fetch('/api/patients')
```

## 🎯 Code Conventions

### Import/Export Rules

```typescript
// ✅ Cross-feature imports (from other features)
import { Landing } from '@/features/landing';
import { Patients } from '@/features/patients';

// ✅ Intra-feature imports (within same feature)
import { usePatients } from '../hooks/usePatients';
import { formatDate } from '../utils/formatters';

// ✅ Type imports (always use 'type' keyword)
import type { Patient, IPatientsService } from '../types';

// ✅ Component imports
import { PatientStatCard, LoadingState } from '../components';
```

### File Naming

- **Components**: PascalCase (e.g., `PatientStatCard.tsx`)
- **Hooks**: camelCase with `use` prefix (e.g., `usePatients.ts`)
- **Services**: PascalCase with `Service` suffix (e.g., `PatientsService.ts`)
- **Utils**: camelCase (e.g., `formatters.ts`)
- **Types**: `index.ts` in `types/` folder

### TypeScript Rules

- **Strict mode enabled** with `verbatimModuleSyntax`
- **No `any` types** allowed
- **Type imports** must use `type` keyword: `import type { T } from '...'`
- **Interfaces over types** for object shapes
- **Path alias**: `@/*` maps to `./src/*`

### Component Rules

- **One component per file** (no multiple exports)
- **Functional components** with TypeScript (no classes)
- **Props interface** defined in `types/index.ts`
- **Presentation logic only** in components (business logic in hooks)

### Dependency Injection Pattern

Services are **injected into hooks**, not instantiated inside them. The service instance is created in the page component and passed to the hook.

```typescript
// ❌ BAD - Service created inside hook
export const usePatients = () => {
  const service = new PatientsService(); // Don't do this!
  // ...
};

// ✅ GOOD - Service injected from outside
export const usePatients = (service: IPatientsService) => {
  // Use injected service
  const data = await service.getAllPatients();
  // ...
};

// ✅ Usage in page component (service instantiated outside component)
// src/features/patients/pages/Patients.tsx

import { PatientsService } from '../services/PatientsService';
import { usePatients } from '../hooks/usePatients';

// Create service instance OUTSIDE component (singleton pattern)
const patientsService = new PatientsService();

export const Patients: React.FC = () => {
  // Inject service into hook
  const { patients, loading } = usePatients(patientsService);

  return <div>{/* UI */}</div>;
};
```

**Benefits:**
- ✅ Better testability (easy to mock services in tests)
- ✅ Loose coupling (hook doesn't know about concrete service)
- ✅ Single Responsibility Principle (hook manages state, service manages data)
- ✅ Easier to swap implementations (change service without touching hook)
- ✅ Service instantiated once (outside component prevents re-creation on re-renders)

### React Query Pattern

This project uses **TanStack Query (React Query v5)** for server state management. React Query provides automatic caching, background refetching, and request deduplication.

#### Query Keys Factory Pattern

```typescript
// src/features/patients/queries/keys.ts
export const patientsKeys = {
  all: ['patients'] as const,
  lists: () => [...patientsKeys.all, 'list'] as const,
  list: (filters?: string) => [...patientsKeys.lists(), { filters }] as const,
  details: () => [...patientsKeys.all, 'detail'] as const,
  detail: (id: string) => [...patientsKeys.details(), id] as const,
} as const;
```

#### Query Options with Dependency Injection

```typescript
// src/features/patients/queries/options.ts
import { queryOptions } from '@tanstack/react-query';
import { patientsKeys } from './keys';
import type { IPatientsService } from '../types';

export const createPatientsQueryOptions = (service: IPatientsService) => ({
  all: () => queryOptions({
    queryKey: patientsKeys.all,
    queryFn: () => service.getAllPatients(),
    staleTime: 1000 * 60 * 5, // 5 minutes
  }),
});
```

#### Hooks with React Query

```typescript
// src/features/patients/hooks/usePatients.ts
import { useQuery } from '@tanstack/react-query';
import { createPatientsQueryOptions } from '../queries/options';
import type { IPatientsService } from '../types';

export const usePatients = (service: IPatientsService) => {
  const patientsQueries = createPatientsQueryOptions(service);
  const { data: patients = [], isLoading } = useQuery(patientsQueries.all());

  // Additional logic (search, filtering, etc.)

  return { patients, loading: isLoading };
};
```

**React Query Benefits:**
- ✅ **Automatic caching** - Reduces network requests by 50-70%
- ✅ **Background refetching** - Data stays fresh automatically
- ✅ **Request deduplication** - Multiple components, single request
- ✅ **DevTools** - Visual query inspector for debugging
- ✅ **No double fetch** - Handles React 18 StrictMode correctly
- ✅ **TypeScript inference** - Full type safety with queryOptions

**React Query DevTools:**
- Available in development mode (bottom-right corner)
- Inspect active/inactive queries
- View cache state and stale times
- Manual refetch and invalidation

**Configuration:**
- `staleTime: 5 minutes` - How long data is considered fresh
- `gcTime: 10 minutes` - How long inactive data stays in cache
- `refetchOnWindowFocus: true` - Refetch when user returns to tab
- `retry: 3` - Retry failed requests 3 times

### MSW (Mock Service Worker) Pattern

This project uses **MSW** to mock API requests during development. MSW intercepts HTTP requests at the network level.

```typescript
// src/mocks/handlers/patients.ts
import { http, HttpResponse } from 'msw';
import type { Patient } from '@/features/patients/types';

export const patientsHandlers = [
  http.get('/api/patients', async () => {
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate delay
    return HttpResponse.json<Patient[]>(mockPatients);
  }),
];
```

**MSW Benefits:**
- ✅ **Network-level mocking** - Services make real fetch() calls
- ✅ **Production-like code** - Same code in dev and production
- ✅ **DevTools visibility** - Requests appear in Network tab
- ✅ **Testing friendly** - Same mocks for tests and development
- ✅ **Easy migration** - Just change API URL for production

**How it works:**
1. Service makes `fetch('/api/patients')` (real HTTP call)
2. MSW Service Worker intercepts the request (in development)
3. MSW handler returns mock data
4. Service receives response (like real API)
5. React Query caches the response

## 🎨 Design System

### Color Palette (Hospital Theme)

The application uses a calming, professional color scheme:

**PRIMARY (Soft whites/light grays)**
- Clean backgrounds and readability
- Range: `primary-50` to `primary-950`

**SECONDARY (Lavender blue pastel)**
- Main theme color for medical context
- Range: `secondary-50` (#F5F5FF) to `secondary-950` (#2E3154)
- Key shades: `secondary-200`, `secondary-500`

**ACCENT (Sage green)**
- Health and wellness emphasis
- Range: `accent-50` (#F1F8F4) to `accent-950` (#1B5E20)
- Key shades: `accent-400`, `accent-600`

### Custom Utilities

```css
/* Gradients */
.bg-gradient-primary     /* Soft lavender gradient */
.bg-gradient-secondary   /* Lavender blue gradient */
.bg-gradient-accent      /* Sage green gradient */

/* Animations (fast & subtle - 200ms) */
.animate-fade-in
.animate-fade-in-down
.animate-slide-in-right
.animate-scale-in

/* Shadows */
.shadow-premium
.shadow-glow
```

### Animation Guidelines

**Professional medical dashboard animations:**
- Entry animations: **200ms** (fast and subtle)
- Hover transitions: **200ms**
- Transform distances: **5px** (minimal movement)
- **Avoid**: Large transforms, scale effects, slow animations
- **Full accessibility**: `prefers-reduced-motion` support

### Hover Effects

```typescript
// ✅ Professional hover (subtle)
className="hover:shadow-md transition-shadow duration-200"

// ❌ Too playful (avoid)
className="hover:scale-105 transition-transform"
```

### Typography Scale

```typescript
// Headings
className="text-2xl md:text-3xl lg:text-4xl font-bold"

// Body
className="text-base md:text-lg"

// Small text
className="text-sm md:text-base"
```

### Component Patterns

**Hero sections:**
```tsx
<div className="bg-gradient-secondary p-8 md:p-12 rounded-3xl">
  {/* Light gradient with white/light text */}
</div>
```

**Cards:**
```tsx
<div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg
                transition-shadow duration-200 border-2 border-secondary-100">
  {/* White background with subtle borders */}
</div>
```

**Buttons:**
```tsx
// Primary (lavender)
<button className="bg-secondary-500 hover:bg-secondary-600 text-white
                   px-6 py-3 rounded-xl transition-all duration-200">

// Accent (sage green)
<button className="bg-accent-500 hover:bg-accent-600 text-white
                   px-6 py-3 rounded-xl transition-all duration-200">
```

## 🛠 Development Workflow

### Creating a New Feature

1. **Create feature directory:**
   ```bash
   mkdir -p src/features/[feature-name]/{types,components,utils,services,hooks,pages}
   ```

2. **Create types first:**
   ```typescript
   // src/features/[feature-name]/types/index.ts
   export interface MyData { ... }
   export interface IMyService { ... }
   ```

3. **Create service:**
   ```typescript
   // src/features/[feature-name]/services/MyService.ts
   import type { MyData, IMyService } from '../types';

   export class MyService implements IMyService {
     async getData(): Promise<MyData> {
       const response = await fetch('/api/mydata');
       if (!response.ok) throw new Error('Failed to fetch');
       return response.json();
     }
   }
   ```

4. **Create React Query keys:**
   ```typescript
   // src/features/[feature-name]/queries/keys.ts
   export const myFeatureKeys = {
     all: ['my-feature'] as const,
     lists: () => [...myFeatureKeys.all, 'list'] as const,
     details: () => [...myFeatureKeys.all, 'detail'] as const,
     detail: (id: string) => [...myFeatureKeys.details(), id] as const,
   } as const;
   ```

5. **Create React Query options:**
   ```typescript
   // src/features/[feature-name]/queries/options.ts
   import { queryOptions } from '@tanstack/react-query';
   import { myFeatureKeys } from './keys';
   import type { IMyService } from '../types';

   export const createMyFeatureQueryOptions = (service: IMyService) => ({
     all: () => queryOptions({
       queryKey: myFeatureKeys.all,
       queryFn: () => service.getData(),
       staleTime: 1000 * 60 * 5,
     }),
   });
   ```

6. **Create data fetching hook:**
   ```typescript
   // src/features/[feature-name]/hooks/useMyFeature.ts
   import { useQuery } from '@tanstack/react-query';
   import { createMyFeatureQueryOptions } from '../queries/options';
   import type { IMyService } from '../types';

   export const useMyFeature = (service: IMyService) => {
     const queries = createMyFeatureQueryOptions(service);
     const { data, isLoading } = useQuery(queries.all());
     return { data, loading: isLoading };
   };
   ```

6b. **Create UI logic hook (if needed):**
   ```typescript
   // src/features/[feature-name]/hooks/useMyFeatureSearch.ts
   import { useState, useMemo } from 'react';
   import type { MyData } from '../types';

   export const useMyFeatureSearch = (data: MyData[]) => {
     const [searchTerm, setSearchTerm] = useState('');

     const filteredData = useMemo(() =>
       data.filter(item =>
         item.name.toLowerCase().includes(searchTerm.toLowerCase())
       ), [data, searchTerm]
     );

     return { searchTerm, setSearchTerm, filteredData };
   };
   ```

   **Note:** One file = One hook. Separate data fetching from UI logic.

7. **Create MSW handler:**
   ```typescript
   // src/mocks/handlers/myFeature.ts
   import { http, HttpResponse } from 'msw';

   export const myFeatureHandlers = [
     http.get('/api/mydata', async () => {
       await new Promise(resolve => setTimeout(resolve, 500));
       return HttpResponse.json({ /* mock data */ });
     }),
   ];
   ```

8. **Add handler to MSW:**
   ```typescript
   // src/mocks/handlers/index.ts
   import { myFeatureHandlers } from './myFeature';

   export const handlers = [
     ...patientsHandlers,
     ...landingHandlers,
     ...myFeatureHandlers, // Add here
   ];
   ```

9. **Create components:**
   ```typescript
   // src/features/[feature-name]/components/MyComponent.tsx
   import type { MyComponentProps } from '../types';

   export const MyComponent: React.FC<MyComponentProps> = ({ ... }) => {
     return <div>...</div>;
   };
   ```

10. **Create page:**
    ```typescript
    // src/features/[feature-name]/pages/MyFeature.tsx
    import { useMyFeature } from '../hooks/useMyFeature';
    import { useMyFeatureSearch } from '../hooks/useMyFeatureSearch';
    import { MyService } from '../services/MyService';
    import { MyComponent } from '../components';

    const myService = new MyService();

    export const MyFeature: React.FC = () => {
      // Data fetching hook
      const { data, loading } = useMyFeature(myService);

      // UI logic hook (if you created one)
      const { searchTerm, setSearchTerm, filteredData } = useMyFeatureSearch(data);

      if (loading) return <div>Loading...</div>;
      return <MyComponent data={filteredData} />;
    };
    ```

    **Note:** Compose multiple hooks in the page component. Each hook has one responsibility.

11. **Add barrel exports:**
    ```typescript
    // src/features/[feature-name]/index.ts
    export * from './types';
    export * from './components';
    export * from './queries/keys';
    export * from './queries/options';
    export { MyFeature } from './pages/MyFeature';
    export { useMyFeature } from './hooks/useMyFeature';
    ```

12. **Add route:**
    ```typescript
    // src/main.tsx
    import { MyFeature } from '@/features/my-feature';

    <Route path="/my-feature" element={<MyFeature />} />
    ```

### Adding a Component to Existing Feature

1. **Define props in types:**
   ```typescript
   // types/index.ts
   export interface MyNewComponentProps {
     title: string;
     data: SomeType;
   }
   ```

2. **Create component file:**
   ```typescript
   // components/MyNewComponent.tsx
   import type { MyNewComponentProps } from '../types';

   export const MyNewComponent: React.FC<MyNewComponentProps> = ({ title, data }) => {
     return <div>{title}</div>;
   };
   ```

3. **Export from components barrel:**
   ```typescript
   // components/index.ts
   export { MyNewComponent } from './MyNewComponent';
   ```

### Best Practices

- **Read types first** - Check `types/index.ts` to understand feature contracts
- **Use existing components** - Check `components/` before creating new ones
- **Follow DI pattern** - Always inject services into hooks
- **Use React Query** - For data fetching (not useState + useEffect)
- **One file = One hook** - Separate data fetching from UI logic
  - Data fetching: `useFeature.ts` (React Query)
  - UI logic: `useFeatureSearch.ts`, `useFeatureForm.ts` (separate files)
- **Create MSW handlers** - For all API endpoints you're fetching
- **Keep pages simple** - Pages should only compose components and hooks
- **Extract utilities** - Reusable logic goes in `utils/`
- **Test TypeScript** - Run `npm run build` frequently
- **Verify caching** - Navigate away and back to see instant load from React Query cache
- **Check React Query DevTools** - Use the visual inspector (bottom-right) in dev mode

## 📚 Available Features

### Landing (`/`)
- Dashboard overview with statistics
- Feature highlights
- Quick actions
- Hero section with hospital branding

### Patients (`/patients`)
- Patient list with comprehensive table
- Real-time search functionality (by name or DNI)
- Statistics cards (Total, Admitted, Discharged)
- React Query caching and background refetching
- MSW mock service with realistic patient data
- Date formatting utilities

### Shared
- Layout component with navigation header
- Reusable UI components (future)

## 🧪 Testing & Development

### Type Checking & Building
```bash
# TypeScript type checking + build
npm run build

# Linting
npm run lint
```

### Development Testing
```bash
# Start dev server (with MSW mocking enabled)
npm run dev
```

**What to verify:**
1. ✅ Browser console shows `[MSW] Mocking enabled.`
2. ✅ React Query DevTools icon in bottom-right corner
3. ✅ Navigate to `/patients` - data loads from MSW
4. ✅ Search functionality works (type in search bar)
5. ✅ Network tab shows requests to `/api/patients` (intercepted by MSW)
6. ✅ Navigate away and back - instant load from React Query cache

### React Query DevTools
- **Location:** Bottom-right corner (development only)
- **Features:**
  - View all active/inactive queries
  - Inspect query data and state (fresh/stale)
  - Manual refetch and invalidation
  - Cache explorer
  - Timeline of query operations

### MSW Verification
- Open browser DevTools → Network tab
- Requests to `/api/patients` and `/api/dashboard` should appear
- These are intercepted by MSW (not real API calls)
- Response times include simulated delay (500-1000ms)

## 📝 Additional Resources

- **CLAUDE.md** - Detailed guidance for AI assistants working on this codebase
- **TanStack Query (React Query) Docs** - https://tanstack.com/query/latest
- **MSW (Mock Service Worker) Docs** - https://mswjs.io/docs
- **Tailwind v4 Docs** - https://tailwindcss.com/docs
- **React 19 Docs** - https://react.dev
- **TypeScript Handbook** - https://www.typescriptlang.org/docs

## 🤝 Contributing

When contributing to this project:

1. Follow the established architecture (Screaming Architecture)
2. Maintain the "one file = one responsibility" principle
3. Keep types centralized in `types/` folders
4. Use dependency injection for services
5. Use React Query for data fetching (create `queries/` folder)
6. Use MSW for API mocking (add handlers in `mocks/handlers/`)
7. Preserve the Hospital Dashboard theme (lavender + sage green)
8. Keep animations fast (200ms) and subtle
9. Write all code in English
10. Use TypeScript strict mode (no `any`)
11. Always run `npm run build` before committing

## 📄 License

This project is part of DUOC UC coursework.
