import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef } from "@angular/material/dialog";
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
      private _docService: DocumentsService,
      private _dialogRef: MatDialogRef<FileAttacherComponent>
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
      this.form = this._docService.contactForm;     
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
   * onSubmit
   */
  public onSubmit() {
    if (this.form.valid) {
      //this._docService.sendDoc(this.form.controls.cne)
      this.onClose();       
    }
  }

  /**
   * onClose
   */
  public onClose() {
    this.form.reset();
    this._docService.resetFormGroup();
    this._dialogRef.close();
  }


}


