import { useMemo, useState } from "react";
import type { TournamentId } from "../../model/types";
import { useAppSelector } from "../../../../app/store/hooks";
import { makeSelectStandings } from "../../model/selectors/selectors";
import Button from "../../../../shared/ui/Button/Button";
import AddScoreForm from "../../../../shared/ui/AddScoreForm/AddScoreForm";
import AddParticipant from "../../../../shared/ui/AddParticipant/AddParticipant";
import styles from "./EurobasketContent.module.css";
import Modal from "../../../../shared/ui/Modal/Modal";
import EurobasketStandings from "./components/Standings/EurobasketStandings";
import EurobasketMatchList from "./components/EurobasketMatchList/EurobasketMatchList";

type Props = { tournamentId: TournamentId };

export default function EurobasketContent({ tournamentId }: Props) {
    const [addTeamOpen, setAddTeamOpen] = useState(false);
    const [addScoreOpen, setAddScoreOpen] = useState(false);

    const selectStandings = useMemo(
        () => makeSelectStandings(tournamentId),
        [tournamentId]
    );
    const rows = useAppSelector(selectStandings);

    return (
        <div className={styles.root}>
            <div className={styles.topBar}>
                <Button
                    className={styles.orangeBtn}
                    onClick={() => setAddTeamOpen(true)}
                >
                    + Add Team
                </Button>

                <Button
                    className={styles.orangeBtn}
                    onClick={() => setAddScoreOpen(true)}
                >
                    + Add Score
                </Button>
            </div>

            <EurobasketMatchList tournamentId={tournamentId} />

            <div className={styles.sectionTitle}>Score Table:</div>

            <EurobasketStandings rows={rows} />

            {addTeamOpen && (
                <Modal title="Add Team" onClose={() => setAddTeamOpen(false)}>
                    <AddParticipant
                        tournamentId={tournamentId}
                        placeholder="Team Name"
                        buttonLabel="Add"
                    />
                </Modal>
            )}

            {addScoreOpen && (
                <Modal title="Add Score" onClose={() => setAddScoreOpen(false)}>
                    <AddScoreForm tournamentId={tournamentId} />
                </Modal>
            )}
        </div>
    );
}
