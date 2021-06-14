import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { BiblioService } from './biblio.service';
import { BiblioArticleComponent } from './dialogs/article/article.component';
import { fuseAnimations } from "@fuse/animations";
import { BiblioAddArticleComponent } from './dialogs/add-article/add-article.component';

@Component({
    selector     : 'biblio',
    templateUrl  : './biblio.component.html',
    styleUrls    : ['./biblio.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class BiblioComponent implements OnInit, OnDestroy
{
    knowledgeBase: any;

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {BiblioService} _biblioService
     * @param {MatDialog} _matDialog
     */
    constructor(
        private _biblioService: BiblioService,
        private _matDialog: MatDialog
    )
    {
        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        this._biblioService.onKnowledgeBaseChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(response => {
                this.knowledgeBase = response;
            });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Read article
     *
     * @param article
     */
    readArticle(article): void
    {
        this._matDialog.open(BiblioArticleComponent, {
            panelClass: 'biblio-article-dialog',
            data      : {article: article}
        });
    }
     /**
     * Read article
     *
     * @param article
     */
    addArticle(): void
    {
        let dialogRef = this._matDialog.open(BiblioAddArticleComponent, {
            panelClass: 'biblio-add-article-dialog',
            data      : {article: "test"}
        });
        dialogRef.afterClosed().subscribe(e=>{
            if(!e) return;
            this._biblioService.addArtice(e);
        })
    }
}
