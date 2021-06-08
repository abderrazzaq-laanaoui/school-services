import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { TokenInterceptorService } from "./auth/token-interceptor.service";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterModule, Routes } from "@angular/router";
import { MatMomentDateModule } from "@angular/material-moment-adapter";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { ContactsModule } from './main/users/users.module'
import { FuseModule } from "@fuse/fuse.module";
import { FuseSharedModule } from "@fuse/shared.module";
import { ToastrModule, ToastrService } from 'ngx-toastr';

import {
    FuseProgressBarModule,
    FuseSidebarModule,
    FuseThemeOptionsModule,
} from "@fuse/components";

import { fuseConfig } from "app/fuse-config";

import { AppComponent } from "app/app.component";
import { LayoutModule } from "app/layout/layout.module";
import { CalendarModule } from "app/main/calendar/calendar.module";
import { LoginModule } from "./main/login/login.module";
import { HomeModule } from "./main/home/home.module";
import { ProfileModule } from "./main/profile/profile.module";
import { InfosModule } from "./main/infos/infos.module";
import { DocumentsModule } from "./main/documents/documents.module";
import { FileAttacherComponent } from "./dialog/file-attacher/file-attacher.component";

const appRoutes: Routes = [
    {
        path: "**",
        redirectTo: "home",
       
    },
];

@NgModule({
    declarations: [AppComponent, FileAttacherComponent],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        RouterModule.forRoot(appRoutes),
        ToastrModule.forRoot(),
        // Material moment date module
        MatMomentDateModule,

        // Material
        MatButtonModule,
        MatIconModule,

        // Fuse modules
        FuseModule.forRoot(fuseConfig),
        FuseProgressBarModule,
        FuseSharedModule,
        FuseSidebarModule,
        FuseThemeOptionsModule,

        // App modules
        LayoutModule,
        CalendarModule,
        HomeModule,
        ProfileModule,
        InfosModule,
        DocumentsModule,
        LoginModule,ContactsModule
    ],
    providers: [
        ToastrService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: TokenInterceptorService,
            multi: true,
        } 
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
