import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';

import { FuseSharedModule } from '@fuse/shared.module';

import { InfosService } from './infos.service';
import { InfosComponent } from './infos.component';
import { MatButtonModule } from '@angular/material/button';

const routes = [
    {
        path     : 'infos',
        component: InfosComponent,
        resolve  : {
            faq: InfosService
        }
    }
];

@NgModule({
    declarations: [
        InfosComponent
    ],
    imports     : [
        RouterModule.forChild(routes),
        MatButtonModule,
        MatExpansionModule,
        MatIconModule,

        FuseSharedModule
    ],
    providers   : [
        InfosService
    ]
})
export class InfosModule
{
}
