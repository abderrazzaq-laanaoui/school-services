import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseWidgetModule } from '@fuse/components/widget/widget.module';
import { MatInputModule } from '@angular/material/input';
import { MatStepperModule } from '@angular/material/stepper';
import { MaterialFileInputModule } from 'ngx-material-file-input';
import {  DocumentsComponent } from './documents.component';
import { DocumentsService } from './documents.service';
import {MatDialogModule} from '@angular/material/dialog';
import { FileAttacherComponent} from 'app/dialog/file-attacher/file-attacher.component'
import { ConfirmDialogComponent } from 'app/dialog/confirm-dialog/confirm-dialog.component';
import{ RoleGuardService as RoleGuard} from 'app/auth/role-guard.service'
import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';

const routes: Routes = [
    {
        path     : 'documents',
        component: DocumentsComponent,
        canActivate: [RoleGuard],
        data: {
            expectedRole: ["Admin"],
        },
        resolve  : {
            data: DocumentsService
        }
    }
];
export function tokenGetter() {
    try{
    return localStorage.getItem("data");
    }catch(e){        
    }
  }
@NgModule({
    declarations: [
        DocumentsComponent,
       // ConfirmDialogComponent
    ],
    imports     : [
        RouterModule.forChild(routes),
        JwtModule.forRoot({
            config: {
              tokenGetter: tokenGetter,
            },
          }),
        MatButtonModule,
        MatDividerModule,
        MatFormFieldModule,
        MatIconModule,
        MatMenuModule,
        MatSelectModule,
        MatTableModule,
        MatDialogModule,
        NgxChartsModule,
        MatInputModule,
        MatStepperModule,
        FuseSharedModule,
        FuseWidgetModule,MaterialFileInputModule,

    ],
    providers   : [
        DocumentsService,
        JwtHelperService
    ],
    exports:[
        MatButtonModule,
        MatDividerModule,
        MatFormFieldModule,
        MatIconModule,
        MatMenuModule,
        MatSelectModule,
        MatTableModule,
        MatDialogModule,
        NgxChartsModule,
        MatInputModule,
        MatStepperModule,
        MaterialFileInputModule 
      ],
    entryComponents:[
        FileAttacherComponent
    ]
})
export class DocumentsModule
{
}

