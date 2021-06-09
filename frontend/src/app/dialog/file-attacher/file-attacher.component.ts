import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef } from "@angular/material/dialog";
import { DocumentsService } from 'app/main/documents/documents.service';
import { Subject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-file-attacher',
  templateUrl: './file-attacher.component.html',
  styleUrls: ['./file-attacher.component.scss']
})
export class FileAttacherComponent implements OnInit,OnDestroy {

  form: FormGroup;
  private _file;

  // Private
  private _unsubscribeAll: Subject<any>;

  /**
   * Constructor
   *
   * @param {FormBuilder} _formBuilder
   */
  constructor(
      private _docService: DocumentsService,
      private _dialogRef: MatDialogRef<FileAttacherComponent>,
      private toastr: ToastrService
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
      this._file ="";
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
    let fileExt = "";
    try {
      fileExt = this.form.controls.file.value._fileNames.split('.')[1].toLowerCase() ;
    } catch (e) { 
      this.toastr.error("Seulement les fichier pdf sont acceptés","ERREUR")
      return; 
    }
    if(fileExt !== 'pdf'){
      return;
    }
    if (this.form.valid ) {
      const id = this.form.controls.id.value;
      this._docService.sendDoc(id,this._file)
      this.onClose();       
    }
  }
  handleUpload(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
        this._file = reader.result;
    };
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


