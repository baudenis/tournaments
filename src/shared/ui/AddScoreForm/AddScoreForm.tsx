import { useState } from "react";
import type { TournamentId } from "../../../features/tournament/model/types";
import { useAddScoreForm } from "../../../features/tournament/hooks/useAddScoreForm";
import Input from "../Input/Input";
import Button from "../Button/Button";
import styles from "./AddScoreForm.module.css";

type Props = {
    tournamentId: TournamentId;
    aLabel?: string;
    bLabel?: string;
    aScoreLabel?: string;
    bScoreLabel?: string;
};

export default function AddScoreForm({
                                         tournamentId,
                                         aLabel = "Home Team",
                                         bLabel = "Away Team",
                                         aScoreLabel = "Home Score",
                                         bScoreLabel = "Away Score",
                                     }: Props) {
    const {
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
        canSubmit,
        isDraw,
        submit,
    } = useAddScoreForm(tournamentId);

    const [error, setError] = useState<string | null>(null);

    const needMoreTeams = participants.length < 2;

    let hint: string | null = null;
    if (needMoreTeams) hint = "Add at least 2 participants to enter a score.";
    else if (!aId || !bId) hint = "Select both participants.";
    else if (aId === bId) hint = "Participants must be different.";
    else if (aScore.trim() === "" || bScore.trim() === "") hint = "Enter both scores.";
    else if (alreadyPlayed) hint = "These participants have already played.";
    else if (tournamentId === "wimbledon" && isDraw) hint = "Draws are not allowed in Wimbledon.";
    else if (!canSubmit) hint = "Scores must be whole numbers (0 or more).";

    return (
        <div className={styles.wrap}>
            <div className={styles.row}>
                <select
                    className={styles.select}
                    value={aId}
                    onChange={(e) => {
                        const next = e.target.value;
                        setAId(next);
                        setError(null);
                        if (next === bId) setBId("");
                    }}
                    disabled={needMoreTeams}
                >
                    <option value="" disabled>
                        {aLabel}
                    </option>
                    {participants
                        .filter((p) => p.id !== bId)
                        .map((p) => (
                            <option key={p.id} value={p.id}>
                                {p.name}
                            </option>
                        ))}
                </select>

                <select
                    className={styles.select}
                    value={bId}
                    onChange={(e) => {
                        const next = e.target.value;
                        setBId(next);
                        setError(null);
                        if (next === aId) setAId("");
                    }}
                    disabled={needMoreTeams}
                >
                    <option value="" disabled>
                        {bLabel}
                    </option>
                    {participants
                        .filter((p) => p.id !== aId)
                        .map((p) => (
                            <option key={p.id} value={p.id}>
                                {p.name}
                            </option>
                        ))}
                </select>
            </div>

            <div className={styles.row}>
                <Input
                    value={aScore}
                    onChange={(e) => {
                        setAScore(e.target.value);
                        setError(null);
                    }}
                    placeholder={aScoreLabel}
                    inputMode="numeric"
                    disabled={needMoreTeams}
                />
                <Input
                    value={bScore}
                    onChange={(e) => {
                        setBScore(e.target.value);
                        setError(null);
                    }}
                    placeholder={bScoreLabel}
                    inputMode="numeric"
                    disabled={needMoreTeams}
                />
            </div>

            {hint && <div className={styles.hint}>{hint}</div>}
            {error && <div className={styles.error}>{error}</div>}

            <Button
                fullWidth
                data-role="score"
                onClick={submit}
                disabled={!canSubmit || needMoreTeams || alreadyPlayed}
            >
                Add Score
            </Button>
        </div>
    );
}
