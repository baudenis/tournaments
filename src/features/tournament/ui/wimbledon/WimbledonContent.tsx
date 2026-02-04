import { useMemo, useState } from "react";
import type { TournamentId } from "../../model/types";
import { makeSelectStandings } from "../../model/selectors/selectors";
import { useAppSelector } from "../../../../app/store/hooks";
import Button from "../../../../shared/ui/Button/Button";
import Modal from "../../../../shared/ui/Modal/Modal";
import AddParticipant from "../../../../shared/ui/AddParticipant/AddParticipant";
import AddScoreForm from "../../../../shared/ui/AddScoreForm/AddScoreForm";
import WimbledonStandings from "./components/Standings/WimbledonStandings";
import styles from "./WimbledonContent.module.css";

type Props = { tournamentId: TournamentId };

export default function WimbledonContent({ tournamentId }: Props) {
    const selectStandings = useMemo(
        () => makeSelectStandings(tournamentId),
        [tournamentId]
    );
    const rows = useAppSelector(selectStandings);

    const [addPlayerOpen, setAddPlayerOpen] = useState(false);
    const [addScoreOpen, setAddScoreOpen] = useState(false);

    return (
        <>
            <div className={styles.actions}>
                <Button data-role="add" onClick={() => setAddPlayerOpen(true)}>
                    + Add Player
                </Button>

                <Button data-role="score" onClick={() => setAddScoreOpen(true)}>
                    + Add Score
                </Button>
            </div>

            <WimbledonStandings rows={rows} />

            {addPlayerOpen && (
                <Modal title="Add Player" onClose={() => setAddPlayerOpen(false)}>
                    <AddParticipant
                        tournamentId={tournamentId}
                        placeholder="Player Name"
                    />
                </Modal>
            )}

            {addScoreOpen && (
                <Modal title="Add Score" onClose={() => setAddScoreOpen(false)}>
                    <AddScoreForm
                        tournamentId={tournamentId}
                        aLabel="Player A"
                        bLabel="Player B"
                        aScoreLabel="Player A Score"
                        bScoreLabel="Player B Score"
                    />

                </Modal>
            )}
        </>
    );
}
