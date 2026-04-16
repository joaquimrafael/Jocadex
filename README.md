# Jocadex

A Pokédex web experience built with React, HTML, and Tailwind CSS. Search, browse, and explore Pokémon data powered by the PokéAPI. (gotta catch 'em all)

## Features

- Browse all Pokémon with mobile-first responsive grid layout
- Search Pokémon by name with debounced input
- Filter by type with a visual type picker
- Load More pagination
- Pokémon detail page: stats, abilities, evolution chain, shiny sprite toggle
- Clean architecture with full test coverage (~102 tests)

## Tech Stack

| Category | Technology |
|----------|-----------|
| Runtime | Node.js |
| UI | React 19 + TypeScript |
| Styling | Tailwind CSS v4 |
| Routing | React Router v7 |
| Server State | TanStack Query v5 |
| Bundler | Vite 6 |
| Testing | Vitest + React Testing Library + MSW |

## Getting Started

```bash
# Clone the repository
git clone https://github.com/joaquimrafael/Jocadex.git
cd Jocadex

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run test` | Run tests in watch mode |
| `npm run test:run` | Run tests once |
| `npm run test:coverage` | Run tests with coverage report |
| `npm run lint` | Lint source files |
| `npm run format` | Format source files with Prettier |

## Architecture

The project follows a **Clean Architecture** pattern with 4 layers:

```
src/
├── domain/          # Types & interfaces (Pokemon entities, API types)
├── data/            # API client, repositories, data mappers
├── presentation/    # React components, hooks, pages
└── shared/          # Constants, utilities, cross-cutting concerns
```

Key design decisions:
- **Mapper layer** isolates raw PokeAPI responses from UI domain types
- **TanStack Query** handles all server state, caching (10min stale), and background fetching
- **URL search params** store filter/search state (bookmarkable)
- **MSW** mocks the API at network level in tests — no real HTTP calls needed
- No Axios — native `fetch` is sufficient

## Data

All Pokémon data is provided by [PokéAPI](https://pokeapi.co). Jocadex is not affiliated with Nintendo or The Pokémon Company.
