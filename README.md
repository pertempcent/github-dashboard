
# GitHub Dashboard

A lightweight React application to search GitHub repositories, view repo issues (Kanban + list), and explore user profiles.

---

## Features

- Repository search via GitHub REST API
- Repository detail view with metadata
- Kanban and list views for issues
- User profile with avatar, bio, location, followers, and starred repos
- Dark mode toggle
- 404 route handling
- API loading and error states

---

## Tech Stack

- React (with TypeScript)
- Vite
- React Router v6
- Axios
- TanStack React Query
- Vanilla CSS

---

## Project Structure & Decisions

- React Query handles all API state and caching
- React Router manages navigation and layout
- CSS is split by feature; SCSS was not used as its added features (nesting, variables) weren’t a added benfits for this scope
- API errors (404, rate limit, network) are handled manually
- Redux and global state were omitted due to scope

---

## Scoped-Out Enhancements

The following improvements were consciously left out due to assignment constraints but would be considered in a full-scale implementation:

-   **API abstraction** into a shared `lib/api.ts` module for clarity and testability
    
-   **DI pattern** to allow mocking and flexible API wiring
    
-   **Dark mode persistence** via `localStorage`
    
-   **Test coverage** with React Testing Library
    
-   **Pagination/infinite scroll** for scalable data lists
    
-   **Accessibility improvements** including ARIA roles and keyboard nav


---

## Getting Started

```bash
npm install
npm run dev
