export type TournamentId = "premierleague" | "eurobasket" | "wimbledon";

export type Participant = {
    id: string;
    name: string;
}

export type StandingRow = {
    id: string;
    name: string;
    played: number;
    wins: number;
    draws: number;
    losses: number;
    points: number;
};

export type Match = {
    id: string;
    aId: string;
    bId: string;
    aScore: number;
    bScore: number;
};

export type TournamentState = {
    participants: Participant[];
    matches: Match[];
}

export type TournamentsState = Record<TournamentId, TournamentState>;