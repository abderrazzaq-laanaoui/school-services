    import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';

import { FuseSharedModule } from '@fuse/shared.module';

import { DemandeService } from './demande.service';
import { DemandeComponent } from './demande.component';
import { MatButtonModule } from '@angular/material/button';
import { DemandeFormDialogComponent } from './demande-form/demande-form.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ReactiveFormsModule } from '@angular/forms';
import { FuseConfirmDialogModule } from '@fuse/components';
import { AuthGuardService as AuthGuard } from 'app/auth/auth-guard.service';
import { FusePipesModule } from '@fuse/pipes/pipes.module';

const routes = [
    {
        path     : 'demande/documents',
        component: DemandeComponent,
        canActivate: [AuthGuard],
        resolve  : {
            faq: DemandeService
        }
    }
];

@NgModule({
    declarations: [
        DemandeComponent,
        DemandeFormDialogComponent
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
        FusePipesModule,


    ],
    exports:[
        ReactiveFormsModule,
        MatSelectModule,
    ],
    providers   : [
        DemandeService
    ]
})
export class DemandeModule
{
}
