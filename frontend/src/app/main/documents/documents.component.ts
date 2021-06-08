import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, Observable } from 'rxjs';
 import { fuseAnimations } from '@fuse/animations';
import { DocumentsService } from './documents.service';
import { MatDialog,MatDialogConfig } from "@angular/material/dialog";
import { FileAttacherComponent } from 'app/dialog/file-attacher/file-attacher.component';
import {  ConfirmDialogModel,ConfirmDialogComponent } from "app/dialog/confirm-dialog/confirm-dialog.component";
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

    widget: any = {};
    dateNow = Date.now();
    result: any;


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

        /**
         * Widget 11
        */
       this.widget = this._docService.data;
       
        this.widget.onContactsChanged = new BehaviorSubject({});
        this.widget.onContactsChanged.next(this.widget.table.rows);
        this.widget.dataSource = new FilesDataSource(this.widget);
        
        
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    formatDate(date:string): Date{      
      return  new Date(JSON.parse(date));
    }
    
    attachFile(request){
        this._docService.populateDialog(request);
       this.dialog.open(FileAttacherComponent,{
          maxWidth:'fit-content'
        });
        
    }

    
  confirmDialog(): void {
    const message = `Are you sure you want to do this?`;

    const dialogData = new ConfirmDialogModel("Confirm Action", message);

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: "500px",
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      this.result = dialogResult;  
      
    });
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

    uploadFile(event){

    }
}

