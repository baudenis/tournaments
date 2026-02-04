import type { StandingRow } from "../../../../model/types";
import styles from "./EurobasketStandings.module.css";

type Props = { rows: StandingRow[] };

export default function EurobasketStandings({ rows }: Props) {
    return (
        <div className={styles.card}>
            <table className={styles.table}>
                <thead>
                <tr>
                    <th className={styles.team}>Team</th>
                    <th>W</th>
                    <th>L</th>
                    <th>D</th>
                    <th className={styles.pts}>Pts</th>
                </tr>
                </thead>
                <tbody>
                {rows.map((r) => (
                    <tr key={r.id}>
                        <td className={styles.team}>
                            <span className={styles.flag}>🏳️</span>
                            {r.name}
                        </td>
                        <td>{r.wins}</td>
                        <td>{r.losses}</td>
                        <td>{r.draws}</td>
                        <td>{r.points}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}
