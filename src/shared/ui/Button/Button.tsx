import type { ButtonHTMLAttributes } from "react";
import styles from "./Button.module.css";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
    fullWidth?: boolean;
};

export default function Button({ className, fullWidth, ...props }: Props) {
    const cn = [
        styles.button,
        fullWidth ? styles.fullWidth : "",
        className ?? "",
    ]
        .filter(Boolean)
        .join(" ");

    return <button {...props} className={cn} />;
}
