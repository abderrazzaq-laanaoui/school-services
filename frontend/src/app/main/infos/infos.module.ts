    import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';

import { FuseSharedModule } from '@fuse/shared.module';

import { InfosService } from './infos.service';
import { InfosComponent } from './infos.component';
import { MatButtonModule } from '@angular/material/button';
import { InfosFormDialogComponent } from './infos-form/infos-form.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ReactiveFormsModule } from '@angular/forms';
import { FuseConfirmDialogModule } from '@fuse/components';
import { AuthGuardService as AuthGuard } from 'app/auth/auth-guard.service';

const routes = [
    {
        path     : 'infos',
        component: InfosComponent,
        canActivate: [AuthGuard],
        resolve  : {
            faq: InfosService
        }
    }
];

@NgModule({
    declarations: [
        InfosComponent,
        InfosFormDialogComponent
    ],
    imports     : [
        RouterModule.forChild(routes),
        MatButtonModule,
        MatExpansionModule,
        MatIconModule,
        MatInputModule,
        MatFormFieldModule,
        FuseSharedModule,
        MatSelectModule,
        MatToolbarModule,
        ReactiveFormsModule,
        FuseConfirmDialogModule,


    ],
    exports:[
        ReactiveFormsModule,
        MatSelectModule,
    ],
    providers   : [
        InfosService
    ]
})
export class InfosModule
{
}
