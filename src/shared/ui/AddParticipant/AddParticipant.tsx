import { useState } from "react";
import type { TournamentId } from "../../../features/tournament/model/types";
import { useAddParticipant } from "../../../features/tournament/hooks/useAddParticipant";
import Input from "../Input/Input";
import Button from "../Button/Button";
import styles from "./AddParticipant.module.css";

type Props = {
    tournamentId: TournamentId;
    placeholder?: string;
    buttonLabel?: string;
};

export default function AddParticipantForm({
                                               tournamentId,
                                               placeholder = "Name",
                                               buttonLabel = "Add",
                                           }: Props) {
    const [name, setName] = useState("");
    const [error, setError] = useState<string | null>(null);

    const addParticipant = useAddParticipant(tournamentId);

    const canAdd = name.trim().length > 0;

    function handleAdd() {
        if (!canAdd) return;

        const result = addParticipant(name);

        if (!result.ok) {
            setError(result.error ?? "Unable to add participant.");
            return;
        }

        setName("");
        setError(null);
    }

    return (
        <div className={styles.wrap}>
            <div className={styles.row}>
                <Input
                    className={styles.input}
                    value={name}
                    onChange={(e) => {
                        setName(e.target.value);
                        setError(null);
                    }}
                    placeholder={placeholder}
                />
                <Button
                    className={styles.button}
                    data-role="add"
                    onClick={handleAdd}
                    disabled={!canAdd}
                >
                    {buttonLabel}
                </Button>
            </div>

            {error && <div className={styles.error}>{error}</div>}
        </div>
    );
}
