import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';

import { FuseModule } from '@fuse/fuse.module';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseProgressBarModule, FuseSidebarModule, FuseThemeOptionsModule } from '@fuse/components';

import { fuseConfig } from 'app/fuse-config';

import { AppComponent } from 'app/app.component';
import { LayoutModule } from 'app/layout/layout.module';
import { CalendarModule } from 'app/main/calendar/calendar.module';
import {LoginModule} from './main/login/login.module';
import { HomeModule } from "./main/home/home.module";
import { DocumentsModule } from "./main/documents/documents.module";
import { FileAttacherComponent } from './dialog/file-attacher/file-attacher.component';

const appRoutes: Routes = [
    {
        path      : '**',
        redirectTo: 'home'
    }
];

@NgModule({
    declarations: [
        AppComponent,
        FileAttacherComponent
        ],
    imports     : [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        RouterModule.forRoot(appRoutes),

        TranslateModule.forRoot(),

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
        DocumentsModule,
        LoginModule
    ],

    bootstrap   : [
        AppComponent
    ]
})
export class AppModule
{
}
