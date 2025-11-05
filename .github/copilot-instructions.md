
# Copilot Instructions for AI Agents

## Project Overview
- Angular 20+ application using standalone components, signals, and zoneless change detection (see `app.config.ts`).
- Main logic in `src/app/`, reusable components in `src/components/`, models in `src/models/`, services in `src/services/`.
- Entry: `src/main.ts`, global styles: `src/styles.scss`, assets: `public/`.

## Architecture & Patterns
- **Standalone Components:** No NgModules; all dependencies must be explicitly imported in the `imports` array.
- **Signals for State:** Use Angular signals (`signal()`) for reactive state; prefer signals over RxJS subjects for simple state.
- **Service Layer:** Centralized business logic in `src/services/suggestion.service.ts`, using `inject()` for DI and RxJS for HTTP.
- **Routing:** Defined in `src/app/app.routes.ts` (route-based navigation, e.g., `/manage`, `/random`).
- **SCSS Styling:** All components use SCSS (enforced by schematics and config).

## Developer Workflows
- **Start Dev Server:** `npm start` or `ng serve` (default port: 4200).
- **Build:** `npm run build` or `ng build` (output: `dist/`).
- **Test:** `npm test` or `ng test` (Karma + Jasmine).
- **Watch Mode:** `npm run watch` for live builds in development mode.
- **Scaffold Components:** `ng generate component <name>` (SCSS enforced).

## Project-Specific Conventions
- **File Naming:** Kebab-case for files/folders, PascalCase for classes/types.
- **Component Organization:** Each component in its own folder with `.ts`, `.html`, `.scss` files.
- **Global Assets:** Static assets in `public/` (not `src/assets/`).
- **Prettier Formatting:** HTML uses Angular parser; print width 100; single quotes enforced.

## Integration & Dependencies
- **Angular Core:** Angular 20.x, RxJS 7.x, TypeScript 5.x.
- **Testing:** Jasmine/Karma for unit tests; no default e2e framework (add as needed).
- **API Integration:**
  - Mockoon API at `http://localhost:3002/suggesties` (CRUD, see model in `src/models/suggestion.model.ts`).
  - Service methods: `getUniqueTypes()`, `getRandomSuggestion(type?)`.

## Examples
- To add a new suggestion feature:
  1. Create a new component in `src/components/`.
  2. Update the model in `src/models/suggestion.model.ts` if needed.
  3. Extend logic in `src/services/suggestion.service.ts`.
  4. Register routes in `src/app/app.routes.ts`.

## Key Files
- `src/app/app.ts`, `src/app/app.html`, `src/app/app.routes.ts`, `src/services/suggestion.service.ts`, `src/models/suggestion.model.ts`, `src/components/`

---

_If any conventions or workflows are unclear, please provide feedback so this guide can be improved._
