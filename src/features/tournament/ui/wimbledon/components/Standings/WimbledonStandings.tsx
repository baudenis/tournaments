import type { StandingRow } from "../../../../model/types";
import styles from "./WimbledonStandings.module.css";

type Props = { rows: StandingRow[] };

export default function WimbledonStandings({ rows }: Props) {
    return (
        <div className={styles.card}>
            <table className={styles.table}>
                <thead>
                <tr>
                    <th className={styles.player}>Player</th>
                    <th>M</th>
                    <th>W</th>
                    <th>L</th>
                    <th className={styles.pts}>Pts</th>
                </tr>
                </thead>

                <tbody>
                {rows.map((r) => (
                    <tr key={r.id}>
                        <td className={styles.player}>{r.name}</td>
                        <td>{r.played}</td>
                        <td>
                                <span className={styles.stat}>
                                    {r.wins} <span className={styles.win}>✓</span>
                                </span>
                        </td>
                        <td>
                                <span className={styles.stat}>
                                    {r.losses} <span className={styles.loss}>×</span>
                                </span>
                        </td>
                        <td className={styles.pts}>{r.points}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}
