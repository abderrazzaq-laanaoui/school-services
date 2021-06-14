import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';

import { FuseSharedModule } from '@fuse/shared.module';
import{BiblioAddArticleComponent} from './dialogs/add-article/add-article.component'
import { BiblioService } from './biblio.service';
import { BiblioComponent } from './biblio.component';
import { BiblioArticleComponent } from './dialogs/article/article.component';
import { QuillModule, QUILL_CONFIG_TOKEN } from "ngx-quill";
import { fuseAnimations } from '@fuse/animations';
import { BrowserModule } from '@angular/platform-browser';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
const routes = [
    {
        path     : 'biblio',
        component: BiblioComponent,
        resolve  : {
            knowledgeBase: BiblioService
        }
    }
];

@NgModule({
    declarations   : [
        BiblioComponent,
        BiblioArticleComponent,
        BiblioAddArticleComponent
    ],
    imports        : [
        RouterModule.forChild(routes),
        QuillModule.forRoot(),
        MatButtonModule,
        MatDialogModule,
        MatIconModule,
        MatListModule,
        MatToolbarModule,
        FuseSharedModule,
        BrowserModule,
        MatInputModule,
        MatFormFieldModule
        
    ],
    providers      : [
        BiblioService
    ],
    entryComponents: [
        BiblioArticleComponent
    ]
})
export class BiblioModule
{
}
