import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, Observable } from 'rxjs';
 import { fuseAnimations } from '@fuse/animations';
import { DocumentsService } from './documents.service';
import { MatDialog,MatDialogConfig } from "@angular/material/dialog";
import { FileAttacherComponent } from 'app/dialog/file-attacher/file-attacher.component';
@Component({
    selector     : 'documents-page',
    templateUrl  : './documents.component.html',
    styleUrls    : ['./documents.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class DocumentsComponent implements OnInit
{
    projects: any[];

    widgets: any;
    widget11: any = {};
    dateNow = Date.now();


    /**
     * Constructor
     *
     * @param {DocumentsService} _projectDashboardService
     * @param {MatDialog} dialog
     */
    constructor(private _docService: DocumentsService, private dialog:MatDialog)
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        this.widgets = this._docService.widgets;

        /**
         * Widget 11
         */
        this.widget11.onContactsChanged = new BehaviorSubject({});
        this.widget11.onContactsChanged.next(this.widgets.widget11.table.rows);
        this.widget11.dataSource = new FilesDataSource(this.widget11);
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    attachFile(contact){
        this._docService.populateDialog(contact);
        this.dialog.open(FileAttacherComponent);
    }

  
}

export class FilesDataSource extends DataSource<any>
{
    /**
     * Constructor
     *
     * @param _widget11
     */
    constructor(private _widget11)
    {
        super();
    }

    /**
     * Connect function called by the table to retrieve one stream containing the data to render.
     *
     * @returns {Observable<any[]>}
     */
    connect(): Observable<any[]>
    {
        return this._widget11.onContactsChanged;
    }

    /**
     * Disconnect
     */
    disconnect(): void
    {
    }
}

