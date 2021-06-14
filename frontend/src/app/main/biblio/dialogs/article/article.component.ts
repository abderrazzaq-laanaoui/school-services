import { Component, ViewEncapsulation, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector     : 'biblio-article',
    templateUrl  : './article.component.html',
    styleUrls    : ['./article.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class BiblioArticleComponent
{
    /**
     * Constructor
     *
     * @param {MatDialogRef<BiblioArticleComponent>} matDialogRef
     * @param _data
     */
    constructor(
        public matDialogRef: MatDialogRef<BiblioArticleComponent>,
        @Inject(MAT_DIALOG_DATA) public _data: any
    )
    {
    }
}
