import { Component,  ViewEncapsulation } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import {  MatDialogRef } from "@angular/material/dialog";
import { Demande } from "../demande.enity";

@Component({
    selector: "user-form-dialog",
    templateUrl: "./demande-form.component.html",
    styleUrls: ["./demande-form.component.scss"],
    encapsulation: ViewEncapsulation.None,
})
export class DemandeFormDialogComponent {
    action: string;
    demande: Demande;
    password: string;
    demandeForm: FormGroup;
    selectedType: string = "";
    types = ["Attestation de scolarité", "Attestation de réussite","Bulletin","Diplôme","Convention de stage","Assurance","Autre"];

    /** 
     * Constructor
     *
     * @param {MatDialogRef<DemandeFormDialogComponent>} matDialogRef
     * @param _data
     * @param {FormBuilder} _formBuilder
     */
    constructor(
        public matDialogRef: MatDialogRef<DemandeFormDialogComponent>,
        // @Inject(MAT_DIALOG_DATA) private _data: any,
        private _formBuilder: FormBuilder
    ) {
        
            // this.dialogTitle = "Ajouter une Demande";
            this.demande = new Demande();
            this.demandeForm = this.createDemandeForm();
        }

       
    

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Create user form
     *
     * @returns {FormGroup}
     */
    createDemandeForm(): FormGroup {
        return this._formBuilder.group({
            type: [this.demande.type],
            autre: [this.demande.autre],
            motif: [this.demande.motif],
        });
    }

    /**
     * onSelectChange
     */
    public onSelectChange(type: string) {        
        this.selectedType = type;
    }

    /**
     * changePassword
     */
}
