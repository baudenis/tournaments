import { useMemo } from "react";
import type { TournamentId } from "../../../../model/types.ts";
import { makeSelectStandings } from "../../../../model/selectors/selectors";
import { useAppSelector } from "../../../../../../app/store/hooks";
import styles from "./PremierLeagueStandings.module.css";

type Props = {
    tournamentId: TournamentId;
};

export default function PremierLeagueStandings({ tournamentId }: Props) {

    const selectStandings = useMemo(() => makeSelectStandings(tournamentId), [tournamentId]);
    const rows = useAppSelector(selectStandings);

    return (
        <div className={styles.wrap}>
            <table className={styles.table}>
                <thead>
                <tr>
                    <th className={styles.left}>Team</th>
                    <th>P</th>
                    <th>W</th>
                    <th>D</th>
                    <th>L</th>
                    <th>Pts</th>
                </tr>
                </thead>

                <tbody>
                {rows.map((r) => (
                    <tr key={r.id}>
                        <td className={styles.left}>{r.name}</td>
                        <td>{r.played}</td>
                        <td>{r.wins}</td>
                        <td>{r.draws}</td>
                        <td>{r.losses}</td>
                        <td>{r.points}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}
