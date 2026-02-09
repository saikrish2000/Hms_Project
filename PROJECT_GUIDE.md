# HMS Project — Project Guide

## Overview

- **Purpose**: Hospital Management System (HMS) demo built with React and Vite. Provides role-based flows for patients, doctors, blood banks, and admins. Uses client-side mock data and contexts; API-ready structure (uses `axios`).
- **Tech stack**: React 19, Vite, React Router, Axios, Bootstrap.

## Quick Links

- Package manifest: [package.json](package.json)
- App entry: [src/main.jsx](src/main.jsx)
- Top-level routes and app wiring: [src/App.jsx](src/App.jsx)
- Auth context: [src/context/AuthContext.jsx](src/context/AuthContext.jsx)
- Protected route implementation: [src/components/ProtectedRoute.jsx](src/components/ProtectedRoute.jsx)
- README: [README.md](README.md)

## Folder Structure (important parts)

- `public/` — static assets and `index.html` served by Vite.
- `src/` — application source code
  - `src/main.jsx` — React entry, wraps providers
  - `src/App.jsx` — Router, routes and role-based protected routes
  - `src/context/` — React Context providers
    - `AuthContext.jsx` — authentication state, login/register/logout (mocked)
    - `AppointmentsContext.jsx` — appointment-related state (provider used in main)
    - `NotificationContext.jsx` — notification state provider
  - `src/components/` — components grouped by feature (Auth, Appointments, Common, Layout, etc.)
  - `src/pages/` — page-level views grouped by role: `Patient/`, `Doctor/`, `Bloodbank/`, `Admin/`
  - `src/assets/`, `src/styles/` — static assets and css

## Dependencies & Scripts

- Key dependencies: `react`, `react-dom`, `react-router-dom`, `axios`, `bootstrap`.
- Dev tools: `vite`, `eslint`, `@vitejs/plugin-react`.
- Scripts (from [package.json](package.json)):

```bash
npm run dev      # start dev server (Vite)
npm run build    # production build
npm run preview  # preview production build
npm run lint     # run eslint
```

## App Flow & Implementation Notes

1. App mounting
   - `src/main.jsx` mounts the app and wraps it with `NotificationProvider` and `AppointmentsProvider`, then renders `<App />`.
2. Routing and roles
   - `src/App.jsx` defines all routes using `react-router-dom` and wraps protected pages with `ProtectedRoute` which checks allowed roles. Public pages include Home, Login, Register, FindDoctor and emergency/demo pages.
3. Authentication (`AuthContext.jsx`)
   - The project uses `AuthContext` as a centralized auth store.
   - Current implementation uses in-memory `MOCK_USERS` and persists the logged-in user in `localStorage` under `user`.
   - Exposed API: `user`, `isAuthenticated`, `login(email, password)`, `register(userData)`, `logout()` via `useAuth()` hook.
   - Login simulates latency, checks credentials against `MOCK_USERS`, enforces a doctor-approval check. Registered doctors are marked `approved: false` to require admin approval.
   - To switch from mocks to real backend: replace login/register implementations with `axios` calls to backend endpoints and normalize responses into the `safeUser` shape.
4. Protected routes
   - `ProtectedRoute.jsx` is used to guard routes based on `user.role`. It redirects or blocks access when role checks fail.
5. State management
   - Small domain contexts for appointments and notifications allow components/pages to consume shared state without prop drilling.
6. API readiness
   - `axios` is present as a dependency. Several components and contexts are ready to call backend APIs — replace the mock logic with `axios` calls and manage error handling.

## Key Files to Inspect

- [src/context/AuthContext.jsx](src/context/AuthContext.jsx) — auth logic and localStorage persistence.
- [src/App.jsx](src/App.jsx) — full route map and role assignments.
- [src/main.jsx](src/main.jsx) — provider composition order.
- [src/components/ProtectedRoute.jsx](src/components/ProtectedRoute.jsx) — role-based gating.
- [src/pages/Patient/BookAppointment.jsx] and relevant pages — booking flow and how appointment data is consumed.

## How to Run Locally

1. Install deps

```bash
npm install
```

2. Start dev server

```bash
npm run dev
```

3. Build for production

```bash
npm run build
npm run preview
```

Open `http://localhost:5173` (Vite default) after starting dev server.

## Environment & Backend Integration Guide

- Currently no `.env` file is required for mock mode.
- To integrate a backend:
  1. Add an `.env` (Vite) variable like `VITE_API_BASE_URL`.
  2. Create an API helper (e.g., `src/api/index.js`) that returns an `axios` instance with baseURL and auth interceptors.
  3. Replace `MOCK_USERS` checks in `AuthContext` with `await api.post('/auth/login', { email, password })` and map the response to `safeUser`.
  4. Use token storage strategy: `httpOnly` cookie (recommended) or `localStorage` with refresh tokens. Update axios interceptors accordingly.

## Testing & Linting

- Lint: `npm run lint` (uses ESLint configuration).
- No unit tests are present by default — consider adding Jest + React Testing Library for components and contexts.

## Security & Production Notes

- Current mock auth persists user in `localStorage` — for production, use secure cookies and server-side session or JWT with refresh tokens.
- Sanitize and validate user input before sending to backend.
- Protect admin operations on the backend (do not rely solely on client-side role checks).

## Developer Handoff / Onboarding Summary (for AI or devs)

- Entry points: start at [src/main.jsx](src/main.jsx) to see providers, then [src/App.jsx](src/App.jsx) to understand routing and role boundaries.
- For auth behavior: read [src/context/AuthContext.jsx](src/context/AuthContext.jsx) and tests/mock users there.
- To add a backend endpoint: add axios helper, update contexts/components to call `api`, and ensure CORS and auth flows are configured server-side.
- For adding roles or pages: add new routes inside `App.jsx` and corresponding `ProtectedRoute` entries.

## Suggested Next Tasks

- Replace mocks with real API calls and add `src/api/axios.js` with baseURL and interceptors.
- Add tests for `AuthContext` and `ProtectedRoute`.
- Add CI linting and basic unit tests to `package.json`.

---

If you want, I can now:

- Convert `AuthContext` to call a real API skeleton (`src/api/axios.js`) and wire it to `.env` variables, or
- Generate an architecture diagram (Mermaid) for the flow, or
- Add unit tests for `AuthContext` and `ProtectedRoute`.

Tell me which of those you'd like next.
