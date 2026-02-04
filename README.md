## Sports Standings App

Single-page application for managing multiple sports tournaments
(Premier League, Eurobasket, Wimbledon).

Users can:
- Add teams / players
- Add match results (each pair plays only once)
- View automatically calculated standings

State persists between refreshes.

## Architecture

- Feature-based structure (`features/tournament`)
- Redux handles domain state and data integrity
- UI-level validation handled in custom hooks
- Shared UI components live in `shared/ui`

## Persistence

Tournament state is persisted to `localStorage`.
Persistence is best-effort and fails gracefully to avoid breaking the app
in restricted browser environments.