import type { ReactNode } from "react";
import styles from "./Field.module.css";

type Props = {
    label: string;
    children: ReactNode;
};

export default function Field({ label, children }: Props) {
    return (
        <label className={styles.field}>
            <span className={styles.label}>{label}</span>
            {children}
        </label>
    );
}