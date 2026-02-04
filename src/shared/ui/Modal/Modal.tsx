import { useEffect, type ReactNode } from "react";
import styles from "./Modal.module.css";

type Props = {
    title: string;
    children: ReactNode;
    onClose: () => void;
};

export default function Modal({ title, children, onClose }: Props) {
    useEffect(() => {
        function onKeyDown(e: KeyboardEvent) {
            if (e.key === "Escape") onClose();
        }
        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, [onClose]);

    return (
        <div className={styles.backdrop} onClick={onClose} role="presentation">
            <div
                className={styles.modal}
                onClick={(e) => e.stopPropagation()}
                role="dialog"
                aria-modal="true"
                aria-label={title}
            >
                <div className={styles.header}>
                    <div className={styles.title}>{title}</div>
                    <button
                        className={styles.close}
                        onClick={onClose}
                        aria-label="Close"
                        type="button"
                    >
                        ✕
                    </button>
                </div>

                {children}
            </div>
        </div>
    );
}
