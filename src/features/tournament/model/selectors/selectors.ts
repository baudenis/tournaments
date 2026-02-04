import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "../../../../app/store";
import type { TournamentId, StandingRow } from "../types";

const selectTournament = (tournamentId: TournamentId) => (state: RootState) =>
    state.tournaments[tournamentId];

export const makeSelectStandings = (tournamentId: TournamentId) =>
    createSelector([selectTournament(tournamentId)], (t): StandingRow[] => {
        const { participants, matches } = t;

        const rows: StandingRow[] = participants.map((p) => {
            let played = 0;
            let wins = 0;
            let draws = 0;
            let losses = 0;
            let points = 0;

            for (const m of matches) {
                if (m.aId !== p.id && m.bId !== p.id) continue;

                played++;

                const isA = m.aId === p.id;
                const scored = isA ? m.aScore : m.bScore;
                const conceded = isA ? m.bScore : m.aScore;

                if (scored > conceded) {
                    wins++;
                    points += 3;
                } else if (scored < conceded) {
                    losses++;
                } else {
                    draws++;
                    points += 1;
                }
            }

            return { id: p.id, name: p.name, played, wins, draws, losses, points };
        });

        rows.sort((a, b) => {
            if (b.points !== a.points) return b.points - a.points;
            return a.name.localeCompare(b.name);
        });

        return rows;
    });
