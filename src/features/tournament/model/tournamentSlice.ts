import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { TournamentId, TournamentsState, Participant, Match } from "./types";

const initialState: TournamentsState = {
    premierleague: { participants: [], matches: [] },
    eurobasket: { participants: [], matches: [] },
    wimbledon: { participants: [], matches: [] },
};

function makeId() {
    return crypto.randomUUID();
}

function normalizeName(name: string) {
    return name.trim().replace(/\s+/g, " ");
}

function matchKey(aId: string, bId: string) {
    return aId < bId ? `${aId}:${bId}` : `${bId}:${aId}`;
}

type AddParticipantPayload = {
    tournamentId: TournamentId;
    name: string;
};

type AddMatchPayload = {
    tournamentId: TournamentId;
    aId: string;
    bId: string;
    aScore: number;
    bScore: number;
};

export const tournamentSlice = createSlice({
    name: "tournaments",
    initialState,
    reducers: {
        addParticipant: {
            prepare(payload: AddParticipantPayload) {
                return { payload };
            },
            reducer(state, action: PayloadAction<AddParticipantPayload>) {
                const { tournamentId, name } = action.payload;
                const t = state[tournamentId];

                const normalized = normalizeName(name);
                if (!normalized) return;

                const lower = normalized.toLowerCase();
                const exists = t.participants.some(
                    (p) => p.name.toLowerCase() === lower
                );
                if (exists) return;

                const participant: Participant = { id: makeId(), name: normalized };
                t.participants.push(participant);
            },
        },

        addMatch: {
            prepare(payload: AddMatchPayload) {
                return { payload };
            },
            reducer(state, action: PayloadAction<AddMatchPayload>) {
                const { tournamentId, aId, bId, aScore, bScore } = action.payload;
                const t = state[tournamentId];

                if (aId === bId) return;
                if (!Number.isInteger(aScore) || !Number.isInteger(bScore)) return;
                if (aScore < 0 || bScore < 0) return;

                if (tournamentId === "wimbledon" && aScore === bScore) return;

                const ids = new Set(t.participants.map((p) => p.id));
                if (!ids.has(aId) || !ids.has(bId)) return;

                const key = matchKey(aId, bId);
                const alreadyPlayed = t.matches.some((m) => matchKey(m.aId, m.bId) === key);
                if (alreadyPlayed) return;

                const match: Match = {
                    id: makeId(),
                    aId,
                    bId,
                    aScore,
                    bScore,
                };

                t.matches.push(match);
            },
        },
    },
});

export const { addParticipant, addMatch } = tournamentSlice.actions;
export default tournamentSlice.reducer;
