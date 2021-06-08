import { Component, Inject, ViewEncapsulation } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

import { User } from "../user.model";

@Component({
    selector: "users-user-form-dialog",
    templateUrl: "./user-form.component.html",
    styleUrls: ["./user-form.component.scss"],
    encapsulation: ViewEncapsulation.None,
})
export class ContactsContactFormDialogComponent {
    action: string;
    user: User;
    password:string;
    userForm: FormGroup;
    selectedRole: string = "";
    dialogTitle: string;
    roles = ["Etudiant","Professeur","Admin"]

    /**
     * Constructor
     *
     * @param {MatDialogRef<ContactsContactFormDialogComponent>} matDialogRef
     * @param _data
     * @param {FormBuilder} _formBuilder
     */
    constructor(
        public matDialogRef: MatDialogRef<ContactsContactFormDialogComponent>,
        @Inject(MAT_DIALOG_DATA) private _data: any,
        private _formBuilder: FormBuilder
    ) {
        // Set the defaults
        this.action = _data.action;

        if (this.action === "edit") {
            console.log(_data);

            this.dialogTitle = "Modifier l'utilisateur";
            this.user = _data.user;
        } else {
            this.dialogTitle = "Ajouter un utilisateur";
            this.user = new User({});
        }

        this.userForm = this.createContactForm(_data.action);
        // console.log();

    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Create user form
     *
     * @returns {FormGroup}
     */
    createContactForm(action:string): FormGroup {
        return this._formBuilder.group({
            id: [this.user.id],
            prenom: [this.user.prenom],
            nom: [this.user.nom],
            password: [this.user.password],
            avatar: [this.user.avatar],
            cin: [this.user.cin],
            type: [this.user.type],
            email: [this.user.email],
            tel: [this.user.tel],
            cne: [this.user.cne],
            birthday: [this.user.birthday],
            action
        });
    }

    /**
     * onSelectChange
     */
    public onSelectChange(role:string) {
        this.selectedRole = role;   
    }
    /**
     * changePassword
     */
    public changePassword() {
        this.userForm.controls.password.setValue( this.capitalize(this.userForm.controls.nom.value)+ "@" + (this.userForm.controls.cin.value ? this.userForm.controls.cin.value.toLowerCase() :""))
    }
    
    private capitalize(word:string) {
        if(!word) return word
        if(word.length === 1) return word.toUpperCase();
        return word[0].toUpperCase() + word.substring(1).toLowerCase() ;
      }
}
