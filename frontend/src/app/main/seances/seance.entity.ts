export class Seance {
    infos: {
        class: number;
        matiere: number;
        date: Date;
        heures: number;
    };

    absence: Array<{
        etudiant: number;
        isAbsente: boolean;
    }>;

    rapport: string;
}
