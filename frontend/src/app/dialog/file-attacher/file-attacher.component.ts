import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DocumentsService } from 'app/main/documents/documents.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-file-attacher',
  templateUrl: './file-attacher.component.html',
  styleUrls: ['./file-attacher.component.scss']
})
export class FileAttacherComponent implements OnInit,OnDestroy {

  form: FormGroup;

  // Private
  private _unsubscribeAll: Subject<any>;

  /**
   * Constructor
   *
   * @param {FormBuilder} _formBuilder
   */
  constructor(
      private docService: DocumentsService
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
      // Reactive Form
      this.form = this.docService.contact;     
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


}


