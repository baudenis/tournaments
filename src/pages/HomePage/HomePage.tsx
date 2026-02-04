import TournamentPanel from "../../features/tournament/ui/TournamentPanel/TournamentPanel";
import styles from "./HomePage.module.css";

export default function HomePage() {
    return (
        <main className={styles.page}>
            <TournamentPanel tournamentId="premierleague" />
            <TournamentPanel tournamentId="eurobasket" />
            <TournamentPanel tournamentId="wimbledon" />
        </main>
    );
}
