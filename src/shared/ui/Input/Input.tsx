import type { InputHTMLAttributes } from "react";
import styles from "./Input.module.css";

type Props = InputHTMLAttributes<HTMLInputElement>;

export default function Input({ className, ...props }: Props) {
    const cn = [styles.input, className ?? ""].filter(Boolean).join(" ");
    return <input {...props} className={cn} />;
}
