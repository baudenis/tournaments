import type { ComponentType } from "react";

import type { TournamentId } from "../../model/types";
import styles from "./TournamentPanel.module.css";

import PremierLeagueContent from "../premierLeague/PremierLeagueContent";
import EurobasketContent from "../eurobasket/EurobasketContent";
import WimbledonContent from "../wimbledon/WimbledonContent";

type Props = {
    tournamentId: TournamentId;
};

type ContentProps = { tournamentId: TournamentId };

const contentMap: Record<TournamentId, ComponentType<ContentProps>> = {
    premierleague: PremierLeagueContent,
    eurobasket: EurobasketContent,
    wimbledon: WimbledonContent,
};

type HeaderConfig = {
    title: string;
    icon?: string;
};

const HEADER_CONFIG: Record<TournamentId, HeaderConfig> = {
    premierleague: { title: "Premier League" },
    eurobasket: { title: "Eurobasket", icon: "/basketball.svg" },
    wimbledon: { title: "Wimbledon", icon: "/tennis.svg" },
};

export default function TournamentPanel({ tournamentId }: Props) {
    const Content = contentMap[tournamentId];
    const { title, icon } = HEADER_CONFIG[tournamentId];

    return (
        <section className={styles.panel} data-variant={tournamentId}>
            <header className={styles.header}>
                <h2 className={styles.title}>
                    {icon && (
                        <img
                            src={icon}
                            alt=""
                            className={styles.icon}
                            aria-hidden
                        />
                    )}
                    {title}
                </h2>
            </header>

            <div className={styles.content}>
                <Content tournamentId={tournamentId} />
            </div>
        </section>
    );
}
