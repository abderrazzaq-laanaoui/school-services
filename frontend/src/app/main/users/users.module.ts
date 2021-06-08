import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRippleModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSelectModule } from '@angular/material/select';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseConfirmDialogModule, FuseSidebarModule } from '@fuse/components';
import { RoleGuardService as RoleGuard} from 'app/auth/role-guard.service'
import { ContactsComponent } from './users.component';
import { UsersService } from './users.service';
import { ContactsContactListComponent } from './user-list/user-list.component';
import { ContactsSelectedBarComponent } from './selected-bar/selected-bar.component';
import { ContactsMainSidebarComponent } from './sidebars/main/main.component';
import { ContactsContactFormDialogComponent } from './user-form/user-form.component';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
    {
        path     : 'users',
        component: ContactsComponent,
        canActivate: [RoleGuard],
        data: {
            expectedRole: ["Admin"],
        },
        resolve  : {
            contacts: UsersService
        }
    }
];

@NgModule({
    declarations   : [
        ContactsComponent,
        ContactsContactListComponent,
        ContactsSelectedBarComponent,
        ContactsMainSidebarComponent,
        ContactsContactFormDialogComponent
    ],
    imports        : [
        RouterModule.forChild(routes),
        ReactiveFormsModule,
        MatSelectModule,
        MatButtonModule,
        MatCheckboxModule,
        MatDatepickerModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatMenuModule,
        MatRippleModule,
        MatTableModule,
        MatToolbarModule,
        FuseSharedModule,
        FuseConfirmDialogModule,
        FuseSidebarModule
    ],
    providers      : [
        UsersService
    ],
    entryComponents: [
        ContactsContactFormDialogComponent
    ],
    exports:[ ReactiveFormsModule,
        MatSelectModule,]
})
export class ContactsModule
{
}
