import { FuseNavigation } from '@fuse/types';

export const navigation: FuseNavigation[] = [
    {
        id       : 'student',
        title    : 'Espace Etudiant',
        type     : 'group',
        children : [
            {
                id       : 'home',
                title    : 'ACCUEIL',
                type     : 'item',
                icon     : 'home',
                url      : '/home',
                badge    : {
                    title    : '25',
                    bg       : '#F44336',
                    fg       : '#FFFFFF'
                }
            },
            {
                id       : 'calendrier',
                title    : 'Calendrier',
                type     : 'item', 
                icon     : 'today',
                url      : '/planning',
                badge:{
                    title:'3',
                    bg       : '#F44336',
                    fg       : '#FFFFFF'
                }
               
            }
        ]
    },
    {
        id:'admin',

        title:'Admin',
        type:'group',
        children:[
            {
                id       : 'documents',
                title    : 'Documents',
                type     : 'item',
                icon     : 'attach_file',
                url      : '/documents',
                badge    : {
                    title    : '5',
                    bg       : '#F44336',
                    fg       : '#FFFFFF'
                }
            },
        ]

    }
];
