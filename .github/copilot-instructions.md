# AI Coding Agent Instructions for Suggestions App

This is a modern Angular 20+ application using standalone components, signals, and zoneless change detection.

## Architecture Overview

- **Modern Angular**: Uses Angular 20.3+ with standalone components (no NgModules)
- **Zoneless Change Detection**: Configured with `provideZonelessChangeDetection()` in `app.config.ts`
- **Signal-based State**: Uses Angular signals (`signal()`) for reactive state management
- **SCSS Styling**: Default styling language set to SCSS across the project
- **Component Structure**: Components live in `src/components/` with co-located templates and styles

## Key Configuration Patterns

### Component Structure
```typescript
// Standard component pattern - always use standalone: true is implied
@Component({
  selector: 'app-component-name',
  imports: [/* explicit imports required */],
  templateUrl: './component-name.html',
  styleUrl: './component-name.scss'  // Note: styleUrl (singular)
})
```

### Application Bootstrap
- Entry: `src/main.ts` bootstraps `App` component
- Config: `app.config.ts` contains all providers
- Routes: `app.routes.ts` (currently empty array)
- No `app.module.ts` - this is a standalone application

### TypeScript Configuration
- Strict mode enabled with comprehensive type checking
- `experimentalDecorators: true` for Angular decorators
- `target: "ES2022"` with `module: "preserve"`
- Separate configs for app (`tsconfig.app.json`) and tests (`tsconfig.spec.json`)

## Development Workflows

### Standard Commands
- **Dev server**: `ng serve` or `npm start`
- **Build**: `ng build` (production by default)
- **Watch build**: `ng build --watch --configuration development`
- **Tests**: `ng test` (Karma + Jasmine)
- **Generate components**: `ng generate component component-name`

### Build Configuration
- Uses new `@angular/build:application` builder (not webpack)
- Assets from `public/` directory
- Bundle budgets: 500kB warning, 1MB error for initial bundle
- Component styles: 4kB warning, 8kB error per component

## Project-Specific Conventions

### File Organization
- Components: `src/components/[component-name]/` with co-located files
- Shared styles: `src/styles.scss`
- App shell: `src/app/` contains root app component and config
- Public assets: `public/` directory (not `src/assets/`)

### Code Style (Prettier)
- Print width: 100 characters
- Single quotes: enabled
- Angular HTML parser for templates

### Naming Patterns
- Components: `suggestion-component.ts` (kebab-case files)
- Selectors: `app-suggestion-component` (prefixed with 'app-')
- Classes: `SuggestionComponent` (PascalCase)

## Critical Integration Points

### Signal Usage
Components use signals for reactive state. Example from `app.ts`:
```typescript
protected readonly title = signal('suggestions');
```

### Template Binding
Modern template syntax with signals:
```html
<h1>Hello, {{ title() }}</h1>  <!-- Note: title() function call -->
```

### Standalone Component Imports
All dependencies must be explicitly imported in component `imports` array since there are no modules.

## API Integration

### Mockoon API Structure
- **Base URL**: `http://localhost:3002/suggesties`
- **Data Model**: `{id: string, type: string, waarde: string}`
- **Standard CRUD operations**: GET, POST, PUT, DELETE
- **Example**: `GET /suggesties/7b19e41c-3f3d-4f09-bc2e-6d64cce9d191` returns `{"id":"7b19e41c-3f3d-4f09-bc2e-6d64cce9d191","type":"locatie","waarde":"tandartspraktijk"}`

### Service Layer Pattern
- Services use `inject()` function for dependency injection
- HTTP operations return Observable streams
- Error handling via RxJS operators in components
- Models separated in `src/models/` directory

## When Adding New Features

1. **Components**: Use `ng generate component` to maintain consistent structure
2. **Routing**: Add routes to `src/app/app.routes.ts`
3. **Services**: Create as injectable standalone services with `inject()` pattern
4. **State**: Prefer signals over RxJS subjects for simple state
5. **Styles**: Component styles are scoped; global styles go in `src/styles.scss`
6. **API Integration**: Follow the existing service pattern for HTTP calls

## Testing Notes
- Karma + Jasmine setup
- Spec files excluded from main build (`tsconfig.app.json`)
- Test config in `tsconfig.spec.json`
