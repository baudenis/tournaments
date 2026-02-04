import { useCallback, useMemo, useState } from "react";
import { useAppSelector } from "../../../app/store/hooks";
import type { TournamentId } from "../model/types";
import { useAddMatch } from "./useAddMatch";

function toNonNegInt(value: string): number | null {
    if (value.trim() === "") return null;
    const n = Number(value);
    if (!Number.isFinite(n) || !Number.isInteger(n) || n < 0) return null;
    return n;
}

function matchKey(aId: string, bId: string) {
    return aId < bId ? `${aId}:${bId}` : `${bId}:${aId}`;
}

export function useAddScoreForm(tournamentId: TournamentId) {
    const participants = useAppSelector(
        (state) => state.tournaments[tournamentId].participants
    );

    const matches = useAppSelector(
        (state) => state.tournaments[tournamentId].matches
    );

    const addMatch = useAddMatch(tournamentId);

    const [aId, setAId] = useState("");
    const [bId, setBId] = useState("");
    const [aScore, setAScore] = useState("");
    const [bScore, setBScore] = useState("");

    const aScoreNum = useMemo(() => toNonNegInt(aScore), [aScore]);
    const bScoreNum = useMemo(() => toNonNegInt(bScore), [bScore]);

    const alreadyPlayed = useMemo(() => {
        if (!aId || !bId || aId === bId) return false;
        const key = matchKey(aId, bId);
        return matches.some((m) => matchKey(m.aId, m.bId) === key);
    }, [aId, bId, matches]);

    const isDraw = useMemo(() => {
        if (aScoreNum === null || bScoreNum === null) return false;
        return aScoreNum === bScoreNum;
    }, [aScoreNum, bScoreNum]);

    const disallowDraw = tournamentId === "wimbledon";

    const canSubmit =
        aId !== "" &&
        bId !== "" &&
        aId !== bId &&
        aScoreNum !== null &&
        bScoreNum !== null &&
        !alreadyPlayed &&
        !(disallowDraw && isDraw);

    const reset = useCallback(() => {
        setAId("");
        setBId("");
        setAScore("");
        setBScore("");
    }, []);

    const submit = useCallback(() => {
        if (!canSubmit) return false;

        addMatch({
            aId,
            bId,
            aScore: aScoreNum!,
            bScore: bScoreNum!,
        });

        reset();
        return true;
    }, [addMatch, aId, bId, aScoreNum, bScoreNum, canSubmit, reset]);

    return {
        participants,
        aId,
        setAId,
        bId,
        setBId,
        aScore,
        setAScore,
        bScore,
        setBScore,
        alreadyPlayed,
        isDraw,
        canSubmit,
        submit,
        reset,
    };
}
