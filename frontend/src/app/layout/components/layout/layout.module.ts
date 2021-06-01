import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';


import {VerticalLayoutComponent} from './layout.component';
import {FuseSharedModule} from '../../../../@fuse/shared.module';
import {NavbarModule} from '../navbar/navbar.module';
import {ToolbarModule} from '../toolbar/toolbar.module';
import {ContentModule} from '../content/content.module';
import {FuseSidebarModule} from '../../../../@fuse/components';


@NgModule({
    declarations: [
        VerticalLayoutComponent
    ],
    imports     : [
        RouterModule,
        FuseSharedModule,
        FuseSidebarModule,
        ContentModule,
        NavbarModule,
        ToolbarModule
    ],
    exports     : [
        VerticalLayoutComponent
    ]
})
export class VerticalLayoutModule
{
}
