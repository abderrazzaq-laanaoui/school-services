import { Component,  ViewEncapsulation } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import {  MatDialogRef } from "@angular/material/dialog";
import { Info } from "../info.enity";

@Component({
    selector: "user-form-dialog",
    templateUrl: "./infos-form.component.html",
    styleUrls: ["./infos-form.component.scss"],
    encapsulation: ViewEncapsulation.None,
})
export class InfosFormDialogComponent {
    action: string;
    info: Info;
    password: string;
    infoForm: FormGroup;
    selectedType: string = "";
    dialogTitle: string;
    types = ["General", "Stage"];

    /** 
     * Constructor
     *
     * @param {MatDialogRef<InfosFormDialogComponent>} matDialogRef
     * @param _data
     * @param {FormBuilder} _formBuilder
     */
    constructor(
        public matDialogRef: MatDialogRef<InfosFormDialogComponent>,
        // @Inject(MAT_DIALOG_DATA) private _data: any,
        private _formBuilder: FormBuilder
    ) {
        
            this.dialogTitle = "Ajouter une Info";
            this.info = new Info();
            this.infoForm = this.createInfoForm();
        } 

       
    

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Create user form
     *
     * @returns {FormGroup}
     */
    createInfoForm(): FormGroup {
        return this._formBuilder.group({
            title: [this.info.title],
            content: [this.info.content],
            type: [this.info.type],
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
