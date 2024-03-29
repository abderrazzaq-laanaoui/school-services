import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table'  

import { FuseSharedModule } from '@fuse/shared.module';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import { SeanceService } from './seance.service';
import { SeanceComponent } from './seance.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { RoleGuardService as RoleGuard} from 'app/auth/role-guard.service'
import { MatStepperModule } from '@angular/material/stepper';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatCheckboxModule } from '@angular/material/checkbox';
const routes = [
    {
        path     : 'seance',
        component: SeanceComponent,
        canActivate: [RoleGuard],
        data: {
            expectedRole: ["Professeur"],
        },
        resolve  : {
            profile: SeanceService
        }
    }
];

@NgModule({
    declarations: [
        SeanceComponent,
    ],
    imports     : [
        RouterModule.forChild(routes),
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatStepperModule,
        MatButtonModule,
        MatDividerModule,
        MatIconModule,
        MatTableModule,
        MatDatepickerModule,
        MatCheckboxModule,
        NgxMaterialTimepickerModule,
        FuseSharedModule
    ],
    providers   : [
        SeanceService
    ]
})
export class SeanceModule
{
}
