import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FuseSearchBarModule, FuseShortcutsModule } from '@fuse/components';
import { FuseSharedModule } from '@fuse/shared.module';
import { ToolbarComponent } from 'app/layout/components/toolbar/toolbar.component';
import {MatDividerModule} from '@angular/material/divider';
import { LoginService } from "app/main/login/login.service";

@NgModule({
    declarations: [
        ToolbarComponent
    ],
    imports: [
        RouterModule,
        MatButtonModule,
        MatIconModule,
        MatMenuModule,
        MatToolbarModule,
        FuseSharedModule,
        FuseSearchBarModule,
        FuseShortcutsModule,
        MatDividerModule
    ],
    exports     : [
        ToolbarComponent,  
    ],
    providers:[
        LoginService
    ]
})
export class ToolbarModule
{
}
