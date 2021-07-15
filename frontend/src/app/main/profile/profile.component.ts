import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import decode from "jwt-decode";
import { fuseAnimations } from "@fuse/animations";
import { ProfileService } from "./profile.service";
import { ToastrService } from "ngx-toastr";
import { FormGroup } from "@angular/forms";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { EditPasswordComponent } from "./edit-password/edit-password.component";
import { FuseConfirmDialogComponent } from "@fuse/components/confirm-dialog/confirm-dialog.component";
@Component({
    selector: "profile",
    templateUrl: "./profile.component.html",
    styleUrls: ["./profile.component.scss"],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
})
export class ProfileComponent implements OnInit {
    user: any;
    dialogRef: any;
    confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;
    isCurrentUser: boolean;

    /**
     * Constructor
     */
    constructor(
        private _profileSerive: ProfileService,
        public _matDialog: MatDialog,
        private toastr: ToastrService
    ) {}

    ngOnInit(): void {
        this.user = this._profileSerive.user;
        this.isCurrentUser = this.user.id === this.getCurrentUser();
    }

    editPassword(userId) {
        this.dialogRef = this._matDialog.open(EditPasswordComponent, {
            panelClass: "edit-password-dialog",
            data: {
                id: userId,
            },
        });

        this.dialogRef.afterClosed().subscribe((response) => {
            if (!response) return;
            this.confirmDialogRef = this._matDialog.open(
                FuseConfirmDialogComponent,
                {
                    disableClose: false,
                }
            );

            this.confirmDialogRef.componentInstance.confirmMessage =
                "Vous-voullez vraimenet chnager le mot de passe ?";

            this.confirmDialogRef.afterClosed().subscribe((result) => {
                if (result) {
                    console.log(response);
                    this._profileSerive.updatePassword(response.id, {
                        old_password: response.old,
                        new_password: response.new,
                    });
                }
                this.confirmDialogRef = null;
            });
        });
    }

    resetPassword(userId) {
        this.confirmDialogRef = this._matDialog.open(
            FuseConfirmDialogComponent,
            {
                disableClose: false,
            }
        );

        this.confirmDialogRef.componentInstance.confirmMessage =
            "Vous-voullez vraimenet réinitialiser le mot de passe ?";

        this.confirmDialogRef.afterClosed().subscribe((result) => {
            if (result) {
                this._profileSerive.resetPassword(userId);
            }
            this.confirmDialogRef = null;
        });
    }

    getCurrentUser(): number {
        console.log("call");

        return +(<any>decode(localStorage.getItem("data"))).id;
    }

    onAvatarSelected(event) {
        const file = event.target.files[0];
        if (
            !["jpg", "jpeg", "png"].includes(
                file.name
                    .split(".")
                    [file.name.split(".").length - 1].toLowerCase()
            )
        ) {
            this.toastr.error(
                "seulment les formates suivants sont acceptées : 'png/jpg/jpeg'",
                "ERREUR"
            );
            return;
        }
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            this._profileSerive
                .updateAvatar(this.user.id, reader.result)
                .then((this.user = this._profileSerive.user));
        };
    }
}
