import { Component, Inject, ViewEncapsulation } from "@angular/core";
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";


@Component({
    selector: "profile-edit-password-dialog",
    templateUrl: "./edit-password.component.html",
    styleUrls: ["./edit-password.component.scss"],
    encapsulation: ViewEncapsulation.None,
})
export class EditPasswordComponent {
    action: string;
    passwords:{old:string, new:string};
    password:string;
    userForm: FormGroup;
    dialogTitle: string;
    id: any;

    /**
     * Constructor
     *
     * @param {MatDialogRef<EditPasswordComponent>} matDialogRef
     * @param _data
     * @param {FormBuilder} _formBuilder
     */
    constructor(
        public matDialogRef: MatDialogRef<EditPasswordComponent>,
        @Inject(MAT_DIALOG_DATA) private _data: any,
        private _formBuilder: FormBuilder
    ) {
        
            this.dialogTitle = "Modifier le mot de pass";
            this.id = _data.id;
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
            id: new FormControl(this.id,Validators.required),
            old: new FormControl("",[Validators.required, Validators.pattern(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/)]),
            new: new FormControl("",[Validators.required, Validators.pattern(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/)]),
            confirm: new FormControl("",[Validators.required, Validators.pattern(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/)]),
        },
        {validator: this.passwordConfirming})
    }

    
    /**
     * changePassword
     */
    public changePassword() {
        console.log(this.userForm);
        
        
    }
    
    passwordConfirming(c: AbstractControl): { invalid: boolean } {
        if (c.get('new').value !== c.get('confirm').value) {
            return {invalid: true};
        }
    }
 
}
