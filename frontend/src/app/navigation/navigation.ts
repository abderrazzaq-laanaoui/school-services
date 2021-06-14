import { FuseNavigation } from "@fuse/types";
import decode from "jwt-decode";

export const adminNavigation: FuseNavigation[] = [
    {
        id: "dashbord",
        title: "tableau de bord",
        type: "group",
        children: [
            {
                id: "home",
                title: "ACCUEIL",
                type: "item",
                icon: "home",
                url: "/home",
                badge: {
                    title: "25",
                    bg: "#F44336",
                    fg: "#FFFFFF",
                },
            },
            {
                id: "calendrier",
                title: "Calendrier",
                type: "item",
                icon: "today",
                url: "/planning",
                badge: {
                    title: "3",
                    bg: "#F44336",
                    fg: "#FFFFFF",
                },
            },
            {
                id: "documents",
                title: "Documents",
                type: "item",
                icon: "attach_file",
                url: "/documents",
                badge: {
                    title: "5",
                    bg: "#F44336",
                    fg: "#FFFFFF",
                },
            },
            {
                id: "users",
                title: "Utilisateurs",
                type: "item",
                icon: "account_circle",
                url: "/users",
            },
            {
                id: "infos",
                title: "Flash Infos",
                type: "item",
                icon: "info",
                url: "/infos",
                badge: {
                    title: "2 ",
                    bg: "#F44336",
                    fg: "#FFFFFF",
                },
            },
        ],
    },
];
export const professeurNavigation: FuseNavigation[] = [
    {
        id: "student",
        title: "Espace Professeur",
        type: "group",
        children: [
            {
                id: "home",
                title: "ACCUEIL",
                type: "item",
                icon: "home",
                url: "/home",
                badge: {
                    title: "25",
                    bg: "#F44336",
                    fg: "#FFFFFF",
                },
            },
            {
                id: "calendrier",
                title: "Calendrier",
                type: "item",
                icon: "today",
                url: "/planning",
                badge: {
                    title: "3",
                    bg: "#F44336",
                    fg: "#FFFFFF",
                },
            },
            {
                id: "infos",
                title: "Flash Infos",
                type: "item",
                icon: "info",
                url: "/infos",
                badge: {
                    title: "1",
                    bg: "#F44336",
                    fg: "#FFFFFF",
                },
            },
        ],
    },
];
export const etudiantNavigation: FuseNavigation[] = [
    {
        id: "teacher",
        title: "Espace Etudiant",
        type: "group",
        children: [
            {
                id: "home",
                title: "ACCUEIL",
                type: "item",
                icon: "home",
                url: "/home",
                badge: {
                    title: "25",
                    bg: "#F44336",
                    fg: "#FFFFFF",
                },
            },
            {
                id: "calendrier",
                title: "Calendrier",
                type: "item",
                icon: "today",
                url: "/planning",
                badge: {
                    title: "3",
                    bg: "#F44336",
                    fg: "#FFFFFF",
                },
            },
            {
                id: "infos",
                title: "Flash Infos",
                type: "item",
                icon: "info",
                url: "/infos",
                badge: {
                    title: "1",
                    bg: "#F44336",
                    fg: "#FFFFFF",
                },
            },
            {
                id: "demandes",
                title: "Mes Demandes",
                type: "item",
                icon: "file_copy",
                url: "/demande/documents",
                badge: {
                    title: "1",
                    bg: "#F44336",
                    fg: "#FFFFFF",
                },
            },
        ],
    },
];

export const noNavigation: FuseNavigation[] = [];

