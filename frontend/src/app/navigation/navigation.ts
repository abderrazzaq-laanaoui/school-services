import { FuseNavigation } from '@fuse/types';

export const navigation: FuseNavigation[] = [
    {
        id       : 'student',
        title    : 'Student',
       // translate: 'NAV.MENU',
        type     : 'group',
        children : [
            {
                id       : 'home',
                title    : 'Home',
                translate: 'NAV.HOME',
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
                id       : 'planning',
                title    : 'Planning',
                translate: 'NAV.PLANNING',
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
