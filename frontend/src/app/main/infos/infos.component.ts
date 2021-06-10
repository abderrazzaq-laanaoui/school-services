import {
    Component,
    OnInit,
    OnDestroy,
    ViewEncapsulation,
    AfterContentInit,
} from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { Subject } from "rxjs";
import { debounceTime, distinctUntilChanged, takeUntil } from "rxjs/operators";
import { fuseAnimations } from "@fuse/animations";

import { FuseUtils } from "@fuse/utils";

import { InfosService } from "./infos.service";
import { LoginService } from "../login/login.service";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { InfosFormDialogComponent } from "./infos-form/infos-form.component";
import { FuseConfirmDialogComponent } from "@fuse/components/confirm-dialog/confirm-dialog.component";
@Component({
    selector: "info",
    templateUrl: "./infos.component.html",
    styleUrls: ["./infos.component.scss"],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
})
export class InfosComponent implements OnInit, OnDestroy, AfterContentInit {
    infos: any;
    infosFiltered: any;
    step: number;
    searchInput: any;
    user: string;
    dialogRef: any;
    confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;
    clickButton: boolean;
    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {FaqService} _infosService
     */
    constructor(
        private _infosService: InfosService,
        private loginService: LoginService,
        private _matDialog: MatDialog
    ) {
        // Set the defaults
        this.searchInput = new FormControl("");
        this.step = 0;

        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this._infosService.onInfosChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((response) => {
                this.infos = response;

                this.infosFiltered = response;
            });

        this.searchInput.valueChanges
            .pipe(
                takeUntil(this._unsubscribeAll),
                debounceTime(300),
                distinctUntilChanged()
            )
            .subscribe((searchText) => {
                this.infosFiltered = FuseUtils.filterArrayByString(
                    this.infos,
                    searchText
                );
            });
    }
    ngAfterContentInit(): void {
        this.user = this.loginService.user.role;
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Set step
     *
     * @param {number} index
     */
    setStep(index: number): void {
        this.step = index;
    }

    /**
     * Next step
     */
    nextStep(): void {
        this.step++;
    }

    /**
     * Previous step
     */
    prevStep(): void {
        this.step--;
    }

    /**
     * New contact
     */

    newInfo() {
        this.dialogRef = this._matDialog.open(InfosFormDialogComponent, {
            panelClass: "info-form-dialog",
        });

        this.dialogRef.afterClosed().subscribe((response: FormGroup) => {
            if (!response) {
                return;
            }
            const res = response.getRawValue();
            res.content = res.content.replace(/\n/g, "<br />");
            this._infosService.addInfo(res)
        });
    }

    onDelete(id:number){
        this.clickButton = true;
  
             this.confirmDialogRef = this._matDialog.open(FuseConfirmDialogComponent, {
                 disableClose: false
             });
     
             this.confirmDialogRef.componentInstance.confirmMessage = 'Are you sure you want to delete?';
     
             this.confirmDialogRef.afterClosed().subscribe(result => {
                 if ( result )
                 {
                     this._infosService.deleteInfo(id)
                     
                 }
                 this.confirmDialogRef = null;
             });
     
         }
     
}
