import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/store/hooks";
import { addParticipant } from "../model/tournamentSlice";
import type { TournamentId } from "../model/types";

function normalizeName(name: string) {
    return name.trim().replace(/\s+/g, " ");
}

export function useAddParticipant(tournamentId: TournamentId) {
    const dispatch = useAppDispatch();

    const participants = useAppSelector(
        (state) => state.tournaments[tournamentId].participants
    );

    return useCallback(
        (name: string): { ok: boolean; error?: string } => {
            const normalized = normalizeName(name);
            if (!normalized) {
                return { ok: false, error: "Name cannot be empty." };
            }

            const lower = normalized.toLowerCase();
            const exists = participants.some(
                (p) => p.name.toLowerCase() === lower
            );

            if (exists) {
                return { ok: false, error: "This participant already exists." };
            }

            dispatch(
                addParticipant({
                    tournamentId,
                    name: normalized,
                })
            );

            return { ok: true };
        },
        [dispatch, participants, tournamentId]
    );
}
