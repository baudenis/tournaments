import type { ReactNode } from "react";
import styles from "./ActionsRow.module.css";

type Props = { children: ReactNode };

export default function ActionsRow({ children }: Props) {
    return <div className={styles.row}>{children}</div>;
}
