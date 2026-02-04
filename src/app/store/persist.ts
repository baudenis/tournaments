import type { TournamentsState } from "../../features/tournament/model/types";

const KEY = "sports-standings:v1";

export function loadTournaments(
    fallback: TournamentsState
): TournamentsState {
    try {
        const raw = localStorage.getItem(KEY);
        if (!raw) return fallback;
        return JSON.parse(raw) as TournamentsState;
    } catch {
        return fallback;
    }
}

export function saveTournaments(
    state: TournamentsState
): void {
    try {
        localStorage.setItem(KEY, JSON.stringify(state));
    } catch {
        // ignore persistence errors
    }
}
