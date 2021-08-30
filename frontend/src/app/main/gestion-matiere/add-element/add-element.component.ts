import { Component, Inject, ViewEncapsulation } from "@angular/core";
import {
    AbstractControl,
    FormBuilder,
    FormControl,
    FormGroup,
    ValidatorFn,
    Validators,
} from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

@Component({
    selector: "add-element-dialog",
    templateUrl: "./add-element.component.html",
    styleUrls: ["./add-element.component.scss"],
    encapsulation: ViewEncapsulation.None,
})
export class AddElementComponent {
    elementTypes: Array<string>;
    elementForm: FormGroup;
    dialogTitle: string;
    semestreId: number;
    professeurs: Array<{}>;
    modules: Array<{}>;
    isExtraRequired: boolean;

    /**
     * Constructor
     *
     * @param {MatDialogRef<AddElementComponent>} matDialogRef
     * @param _data
     * @param {FormBuilder} _formBuilder
     */
    constructor(
        public matDialogRef: MatDialogRef<AddElementComponent>,
        @Inject(MAT_DIALOG_DATA) private _data: any,
        private _formBuilder: FormBuilder
    ) {
        this.dialogTitle = "Ajouter un élément";
        this.elementTypes = ["Matiere", "Module"];
        this.semestreId = _data.semestreId;
        this.professeurs = _data.professeurs;
        this.modules = _data.modules;
        this.elementForm = this.createElementForm();
        this.isExtraRequired = true;
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Create user form
     *
     * @returns {FormGroup}
     */
    private createElementForm(): FormGroup {
        return this._formBuilder.group({
            semestreId: new FormControl(this.semestreId, Validators.required),
            type: new FormControl("", Validators.required),
            nom: new FormControl("", Validators.required),
            moduleId: new FormControl("", Validators.required),
            professeurId: new FormControl("", Validators.required),
            coefficient: new FormControl("", Validators.required),
        });
    }

    onTypeChange(event) {        
        if (event.value === "Matiere") {
            if(!this.isExtraRequired){            
                this.isExtraRequired = true;
                this.elementForm.addControl('moduleId', new FormControl("", Validators.required));
                this.elementForm.addControl('professeurId', new FormControl("", Validators.required));
                this.elementForm.addControl('coefficient', new FormControl("", Validators.required));
            }
            return;
        }
        this.isExtraRequired = false;
        this.elementForm.removeControl('moduleId');
        this.elementForm.removeControl('coefficient');
        this.elementForm.removeControl('professeurId');
    }

    test(event) {
        console.log(event);
    }
    
}
