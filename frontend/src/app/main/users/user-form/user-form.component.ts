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
    userForm: FormGroup;
    dialogTitle: string;

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

            this.dialogTitle = "Edit Contact";
            this.user = _data.user;
        } else {
            this.dialogTitle = "Ajouter un utilisateur";
            this.user = new User({});
        }

        this.userForm = this.createContactForm();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Create user form
     *
     * @returns {FormGroup}
     */
    createContactForm(): FormGroup {
        return this._formBuilder.group({
            id: [this.user.id],
            prenom: [this.user.prenom],
            nom: [this.user.nom],
            avatar: [this.user.avatar],
            comcinpany: [this.user.cin],
            role: [this.user.type],
            email: [this.user.email],
            phone: [this.user.phone],
            address: [this.user.address],
            birthday: [this.user.birthday],
        });
    }
}
