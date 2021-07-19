import { Component, Inject, OnInit, ViewEncapsulation } from "@angular/core";
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";


@Component({
    selector: "edit-matiere-dialog",
    templateUrl: "./edit-matiere.component.html",
    styleUrls: ["./edit-matiere.component.scss"],
    encapsulation: ViewEncapsulation.None,
})
export class EditMatiereComponent implements OnInit {
    action: string;
    matiereForm: FormGroup;
    dialogTitle: string;
    matiere : { id: number, nom: string, coefficient: number, professeur: string } ;
 

    /**
     * Constructor
     *
     * @param {MatDialogRef<EditMatiereComponent>} matDialogRef
     * @param _data
     * @param {FormBuilder} _formBuilder
     */
    constructor(
        public matDialogRef: MatDialogRef<EditMatiereComponent>,
        @Inject(MAT_DIALOG_DATA) private _data: any,
        private _formBuilder: FormBuilder
    ) {
        
            

    }

    ngOnInit(): void {
        console.log("data", this._data);
        
        this.matiere = {...this._data};   
        console.log("matiere", this.matiere);
        this.dialogTitle = "Modifier la matiére";
        this.matiereForm = this.createMatiereForm();
        
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Create matiere form
     *
     * @returns {FormGroup}
     */
    createMatiereForm(): FormGroup {
        return this._formBuilder.group({
            id:          new FormControl(this.matiere.id, Validators.required),
            nom:         new FormControl(this.matiere.nom, Validators.required),
            coefficient: new FormControl(this.matiere.coefficient * 100, Validators.required),
            professeur:  new FormControl(this.matiere.professeur, Validators.required)
        })
    }

    
   
    
 
}
