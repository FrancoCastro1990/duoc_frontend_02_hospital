# Hospital Dashboard

A professional medical dashboard application built with React 19, TypeScript, and Tailwind CSS v4. The project emphasizes a calming, professional aesthetic with pastel colors (lavender blue and sage green) appropriate for healthcare environments.

## 🚀 Technologies

- **React 19** - Latest React with modern features
- **TypeScript** - Strict typing for better code quality
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
│   └── FeatureService.ts        # Implementation only (no types)
├── hooks/                       # (Optional) React hooks with state management
│   └── useFeature.ts            # Receives service via dependency injection
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
- `hooks/` - Only if the feature needs custom React hooks

**Examples:**
- A simple static page might only have `pages/` and `index.ts`
- A feature with data fetching would add `types/`, `services/`, and `hooks/`
- A feature with reusable UI elements would add `components/`

### Example: Patients Feature

```
src/features/patients/
├── types/
│   └── index.ts                 # Patient, IPatientsService, component props
├── components/
│   ├── PatientStatCard.tsx      # Reusable stat card
│   ├── LoadingState.tsx         # Loading UI component
│   └── index.ts
├── utils/
│   └── formatters.ts            # formatDate() utility
├── services/
│   └── PatientsService.ts       # Mock data service (implements IPatientsService)
├── hooks/
│   └── usePatients.ts           # Data fetching hook (receives service via DI)
├── pages/
│   └── Patients.tsx             # Main page (uses hook + components)
└── index.ts                     # Exports: Patients, usePatients, types
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
     async getData(): Promise<MyData> { ... }
   }
   ```

4. **Create hook:**
   ```typescript
   // src/features/[feature-name]/hooks/useMyFeature.ts
   import type { IMyService } from '../types';

   export const useMyFeature = (service: IMyService) => {
     // Business logic here
   };
   ```

5. **Create components:**
   ```typescript
   // src/features/[feature-name]/components/MyComponent.tsx
   import type { MyComponentProps } from '../types';

   export const MyComponent: React.FC<MyComponentProps> = ({ ... }) => {
     return <div>...</div>;
   };
   ```

6. **Create page:**
   ```typescript
   // src/features/[feature-name]/pages/MyFeature.tsx
   import { useMyFeature } from '../hooks/useMyFeature';
   import { MyService } from '../services/MyService';
   import { MyComponent } from '../components';

   const myService = new MyService();

   export const MyFeature: React.FC = () => {
     const { data } = useMyFeature(myService);
     return <MyComponent data={data} />;
   };
   ```

7. **Add barrel exports:**
   ```typescript
   // src/features/[feature-name]/index.ts
   export * from './types';
   export * from './components';
   export { MyFeature } from './pages/MyFeature';
   export { useMyFeature } from './hooks/useMyFeature';
   ```

8. **Add route:**
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
- **Keep pages simple** - Pages should only compose components
- **Extract utilities** - Reusable logic goes in `utils/`
- **Test TypeScript** - Run `npm run build` frequently

## 📚 Available Features

### Landing (`/`)
- Dashboard overview with statistics
- Feature highlights
- Quick actions
- Hero section with hospital branding

### Patients (`/patients`)
- Patient list with comprehensive table
- Statistics cards (Total, Admitted, Discharged)
- Mock service with realistic patient data
- Date formatting utilities

### Shared
- Layout component with navigation header
- Reusable UI components (future)

## 🧪 Testing

```bash
# Type checking
npm run build

# Linting
npm run lint

# Manual testing
npm run dev
# Navigate to http://localhost:5173
```

## 📝 Additional Resources

- **CLAUDE.md** - Detailed guidance for AI assistants working on this codebase
- **Tailwind v4 Docs** - https://tailwindcss.com/docs
- **React 19 Docs** - https://react.dev
- **TypeScript Handbook** - https://www.typescriptlang.org/docs

## 🤝 Contributing

When contributing to this project:

1. Follow the established architecture (Screaming Architecture)
2. Maintain the "one file = one responsibility" principle
3. Keep types centralized in `types/` folders
4. Use dependency injection for services
5. Preserve the Hospital Dashboard theme (lavender + sage green)
6. Keep animations fast (200ms) and subtle
7. Write all code in English
8. Use TypeScript strict mode (no `any`)

## 📄 License

This project is part of DUOC UC coursework.
