import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';

import { FuseSharedModule } from '@fuse/shared.module';
import { ProfileService } from './profile.service';
import { ProfileComponent } from './profile.component';
import { ProfileAboutComponent } from './about/about.component';
import { AuthService } from 'app/auth/auth.service';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { EditPasswordComponent } from './edit-password/edit-password.component';
import { MatToolbarModule } from '@angular/material/toolbar';


const routes = [
    {
        path     : 'profile/:id',
        component: ProfileComponent,
        resolve  : {
            profile: ProfileService
        }
    }
];

@NgModule({
    declarations: [
        ProfileComponent,
        ProfileAboutComponent,
        EditPasswordComponent
        ],
    imports     : [
        RouterModule.forChild(routes),
        ReactiveFormsModule,
        MatButtonModule,
        MatDividerModule,
        MatIconModule,
        MatTabsModule,
        MatButtonModule,
        FuseSharedModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        MatToolbarModule

    ],
    providers   : [
        ProfileService,
        AuthService
    ],
    exports:[ReactiveFormsModule]
})
export class ProfileModule
{
}
