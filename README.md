### Pokémon Dual API — React + TypeScript + Vite

A Pokémon list and details UI. Toggle between PokeAPI and a local dataset.

### Tech stack
- **React 18**, **TypeScript**, **Vite**, **ESLint**, **CSS**

### Setup & run
- `npm install`
- `npm run dev` (dev server)
- `npm run build` (production build)
- `npm run preview` (serve build)

Node 18+ required.

### Architectural decisions
- **Dual data sources**: `src/api/` has `pokeapi.ts` (remote) and `customapi.ts` (local), shared `base.ts`, unified `index.ts`.
- **Source toggle via context**: `src/contexts/ApiSourceContext.tsx` provides the active source to the app.
- **Data via hooks**: `src/hooks/usePokemonData.ts` and `src/hooks/usePokemonModal.ts` manage fetching and modal state.
- **Types and UI**: Shared types in `src/types.ts`; presentational components in `src/components/`.

### Search and filter (planned)
- These features are conceptual for now and have not been implemented.
- TODO: Implement search by name and filtering by type(s) in the UI and data layer.
