import type { TournamentId } from "../../model/types";
import AddParticipant from "../../../../shared/ui/AddParticipant/AddParticipant";
import AddScoreForm from "../../../../shared/ui/AddScoreForm/AddScoreForm";
import Card from "./components/Card/Card";
import PremierLeagueStandings from "./components/Standings/PremierLeagueStandings";
import styles from "./PremierLeagueContent.module.css";

type Props = {
    tournamentId: TournamentId;
};

export default function PremierLeagueContent({ tournamentId }: Props) {
    return (
        <div className={styles.stack}>
            <Card title="Add Team">
                <AddParticipant
                    tournamentId={tournamentId}
                    placeholder="Team Name"
                    buttonLabel="Add"
                />
            </Card>

            <Card title="Add Score">
                <AddScoreForm tournamentId={tournamentId} />
            </Card>

            <Card title="Standings">
                <PremierLeagueStandings tournamentId={tournamentId} />
            </Card>
        </div>
    );
}
