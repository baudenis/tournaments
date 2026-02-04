import type { ReactNode } from "react";
import styles from "./Card.module.css";

type Props = {
    title: string;
    children: ReactNode;
};

export default function Card({ title, children }: Props) {
    return (
        <section className={styles.card}>
            <h3 className={styles.title}>{title}</h3>
            <div className={styles.body}>{children}</div>
        </section>
    );
}
