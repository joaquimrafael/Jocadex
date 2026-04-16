# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Common Commands

### Development

- `npm run dev` - Start Vite dev server (runs at [http://localhost:5173](http://localhost:5173))
- `npm run build` - TypeScript type check + Vite production build
- `npm run preview` - Preview production build locally

### Testing

- `npm run test` - Run tests in watch mode with interactive CLI
- `npm run test:run` - Run all tests once (exits after completion)
- `npm run test:coverage` - Generate coverage report
- `npx vitest run src/path/to/test.ts` - Run a single test file
- `npx vitest run src/path/to/test.ts -t "test name"` - Run a specific test by name

### Code Quality

- `npm run lint` - Check code with ESLint
- `npm run format` - Format TypeScript, TSX, and CSS files with Prettier
- `npm run format:check` - Check formatting without modifying files

## Architecture

Jocadex follows a **4-layer clean architecture** pattern:

### Domain Layer (`src/domain/types/`)

Pure TypeScript interfaces with no dependencies on other layers. Contains two categories:

- **Raw API types**: Exactly as returned by PokéAPI (snake_case properties)
  - `RawPokemonDetail`, `RawPokemonSpecies`, `RawEvolutionChain`, `RawTypeDetail`
- **Clean domain entities**: Normalized for UI consumption (camelCase properties)
  - `Pokemon`, `PokemonDetail`, `PokemonStat`, `PokemonAbility`, `EvolutionStage`

### Data Layer (`src/data/`)

Handles API communication and data transformation:

**API Client** (`api/pokeApiClient.ts`)

- Singleton `PokeApiClient` class wrapping fetch
- Methods: `get<T>(endpoint, params?)` and `getByUrl<T>(url)`
- Custom `ApiError` class with `status` property for typed error handling

**Repositories** (`repositories/`)

- Plain async functions (not classes) that call the API client
- `pokemonRepository.ts`: `getPokemonList()`, `getPokemonDetail()`, `getPokemonSpecies()`, `getEvolutionChain()`
- `typeRepository.ts`: `getAllTypes()`, `getTypeDetail()`
- Return raw, unprocessed API types

**Mappers** (`mappers/`)

- Pure functions transforming raw API responses to clean domain entities
- `mapToPokemon()` - Transform RawPokemonDetail to Pokemon
- `mapToPokemonDetail()` - Combine RawPokemonDetail + RawPokemonSpecies
- `mapToEvolutionStages()` - Transform evolution chain into flat list of stages
- Keep data transformation logic isolated from components

### Presentation Layer (`src/presentation/`)

**Custom Hooks** (`hooks/`)

- Each hook encapsulates one data concern and returns a destructured object
- Use TanStack Query (`useQuery`, `useInfiniteQuery`) for server state management
- Call repositories + mappers, never call API client directly
- Example return structure: `{ data, isLoading, isError, error, ...mutations }`
- Notable hooks:
  - `usePokemonList()` - Infinite query for paginated list with offset-based pagination
  - `usePokemonDetail()` - Sequential queries: detail first, then species (enabled chain)
  - `usePokemonSearch()` - Debounced search with 404 handling
  - `usePokemonTypes()` - Type filtering with staleTime=Infinity
  - `useDebounce<T>()` - Generic debounce utility

**Components** (`components/`)

- Organized by domain: `layout/`, `pokemon/`, `ui/`
- Functional React 19 components with TypeScript
- Props interface pattern: Define `interface ComponentProps` above component function
- UI components are "dumb" (controlled, presentation-only)
- Page components use hooks for data fetching
- Styling: Tailwind CSS with `cn()` utility for conditional class composition
- Navigation: Use `react-router-dom` Link components

**Pages** (`pages/`)

- Route-level components handling navigation and state coordination
- Example: `HomePage` uses multiple hooks and conditionally renders search vs. type filter vs. paginated list

### Shared Layer (`src/shared/`)

**Config** (`config/queryClient.ts`)

- Single QueryClient instance exported for app-wide use
- Defaults: staleTime=10min, gcTime=30min, retry=1, refetchOnWindowFocus=false

**Constants** (`constants/`)

- `api.constants.ts` - POKEAPI_BASE_URL, POKEMON_LIST_LIMIT (20), ENDPOINTS
- Type-safe endpoint definitions with `as const`

**Utilities** (`utils/`)

- `cn()` - Combine clsx + tailwind-merge for safe Tailwind class merging
- `urlHelpers.ts` - URL parsing: `extractIdFromUrl()`, `getPokemonImageUrl()`
- `formatters.ts` - Text formatting: `capitalize()`, `formatPokemonId()`, `cleanFlavorText()`

## Testing Strategy

**Setup** (`src/test/setup.ts`)

- Imports `testing-library/jest-dom/vitest` for DOM matchers
- Initializes MSW server with error handling for unmatched requests
- Runs: `beforeAll(listen)`, `afterEach(resetHandlers)`, `afterAll(close)`

**MSW Mocks** (`src/test/mocks/`)

- `server.ts` - MSW Node server setup
- `handlers.ts` - HTTP mock handlers for PokéAPI endpoints (all GET requests return mocked JSON)
- `data/` - Mock data files matching real API responses

**Test Utilities** (`src/test/utils/testUtils.tsx`)

- `createTestQueryClient()` - QueryClient with test overrides: retry=false, gcTime=0
- `renderWithProviders()` - Wraps component with:
  - QueryClientProvider (with test QueryClient)
  - MemoryRouter for routing context
  - Accepts optional `route` prop for testing different routes

### Test Organization

- Tests colocate in `__tests__` folders adjacent to source files
- Pattern: `src/path/to/component.tsx` → `src/path/to/__tests__/component.test.tsx`
- Use `renderWithProviders()` for component tests
- Direct function calls with MSW for data layer tests
- Global test functions available without imports (vitest globals enabled)

## Key Patterns and Conventions

### Import Paths

Always use the `@` alias for imports within src:

```typescript
import { Pokemon } from '@/domain/types/pokemon.types';
import { usePokemonList } from '@/presentation/hooks/usePokemonList';
import { cn } from '@/shared/utils/cn';
```

Configure in `tsconfig.app.json` and `vite.config.ts`.

### Infinite Pagination

`usePokemonList()` uses `useInfiniteQuery()` with offset-based pagination:

- Extract next offset from `response.next` URL
- Initial page param: `0`
- Each page: 20 Pokémon (POKEMON_LIST_LIMIT)

### Error Handling

- Repository functions throw `ApiError` with `status` property
- Hooks catch and transform (e.g., search returns `null` on 404 instead of throwing)
- Components display errors via `ErrorMessage` UI component or retry logic

### Styling

- Tailwind CSS v4 via `@tailwindcss/vite` plugin
- Use `cn()` for conditional classes: `cn("base-class", isActive && "active-class")`
- No CSS modules; utility-first approach throughout

### Component State Management

- Server state: TanStack Query hooks
- URL state: `useSearchParams()` from react-router-dom for filters/search
- Component state: `useState()` for UI-only state (rarely needed)

## TypeScript Configuration

- **Target**: ES2020 (for app), ES2022 (for build tools)
- **Module**: ESNext with bundler resolution
- **Strict Mode**: Enabled (including noUncheckedSideEffectImports)
- **JSX**: react-jsx (automatic runtime)
- **Path alias**: `@/*` → `./src/*`
- **Types**: vitest/globals (test functions available globally)

## Technology Versions

- React 19, React Router 7, TypeScript 5
- Vite 6, Vitest 3
- TanStack Query 5
- Tailwind CSS 4
- MSW 2, Testing Library 16
- ESLint 9, Prettier 3
