import type { TournamentId } from "../../../../model/types";
import { useAppSelector } from "../../../../../../app/store/hooks";
import styles from "./EurobasketMatchList.module.css";

type Props = { tournamentId: TournamentId };

export default function EurobasketMatchList({ tournamentId }: Props) {
    const { participants, matches } = useAppSelector(
        (s) => s.tournaments[tournamentId]
    );

    const nameById = new Map(participants.map((p) => [p.id, p.name]));

    if (matches.length === 0) return null;

    return (
        <div className={styles.list}>
            {matches.map((m) => {
                const aName = nameById.get(m.aId) ?? "Unknown";
                const bName = nameById.get(m.bId) ?? "Unknown";

                return (
                    <div key={m.id} className={styles.item}>
                        <div className={styles.left}>
                            <span className={styles.flag}>🏳️</span>
                            <span className={styles.name}>{aName}</span>
                            <span className={styles.vs}>vs</span>
                            <span className={styles.flag}>🏳️</span>
                            <span className={styles.name}>{bName}</span>
                        </div>

                        <div className={styles.score}>
                            {m.aScore}-{m.bScore}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
