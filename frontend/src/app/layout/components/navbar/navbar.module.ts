import { NgModule } from '@angular/core';

import { FuseSharedModule } from '@fuse/shared.module';

import { NavbarComponent } from './navbar.component';
import { NavbarVerticalStyle1Module } from './vertical/vertical.module';

@NgModule({
    declarations: [
        NavbarComponent
    ],
    imports     : [
        FuseSharedModule,

        NavbarVerticalStyle1Module,
    ],
    exports     : [
        NavbarComponent
    ]
})
export class NavbarModule
{
}
