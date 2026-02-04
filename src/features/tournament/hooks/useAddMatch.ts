import { useCallback } from "react";
import { useAppDispatch } from "../../../app/store/hooks";
import { addMatch } from "../model/tournamentSlice";
import type { TournamentId } from "../model/types";

type AddMatchInput = {
    aId: string;
    bId: string;
    aScore: number;
    bScore: number;
};

export function useAddMatch(tournamentId: TournamentId) {
    const dispatch = useAppDispatch();

    return useCallback(
        (input: AddMatchInput) => {
            dispatch(
                addMatch({
                    tournamentId,
                    ...input,
                })
            );
        },
        [dispatch, tournamentId]
    );
}
