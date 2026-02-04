import { configureStore } from "@reduxjs/toolkit";
import tournamentsReducer from "../../features/tournament/model/tournamentSlice";
import { loadTournaments, saveTournaments } from "./persist";
import type { TournamentsState } from "../../features/tournament/model/types";

const fallbackTournaments: TournamentsState = {
    "premierleague": { participants: [], matches: [] },
    "eurobasket": { participants: [], matches: [] },
    "wimbledon": { participants: [], matches: [] },
};

export const store = configureStore({
    reducer: {
        tournaments: tournamentsReducer,
    },
    preloadedState: {
        tournaments: loadTournaments(fallbackTournaments),
    },
});

store.subscribe(() => {
    saveTournaments(store.getState().tournaments);
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;