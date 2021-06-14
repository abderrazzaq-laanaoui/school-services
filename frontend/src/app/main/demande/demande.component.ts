import {
    Component,
    OnInit,
    OnDestroy,
    ViewEncapsulation,
    AfterContentInit,
    ViewChildren,
    QueryList,
    ElementRef,
} from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { Subject } from "rxjs";
import { debounceTime, distinctUntilChanged, takeUntil } from "rxjs/operators";
import { fuseAnimations } from "@fuse/animations";

import { FuseUtils } from "@fuse/utils";

import { DemandeService } from "./demande.service";
import { LoginService } from "../login/login.service";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { DemandeFormDialogComponent } from "./demande-form/demande-form.component";
import { FuseConfirmDialogComponent } from "@fuse/components/confirm-dialog/confirm-dialog.component";
@Component({
    selector: "demande",
    templateUrl: "./demande.component.html",
    styleUrls: ["./demande.component.scss"],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
})
export class DemandeComponent implements OnInit, OnDestroy, AfterContentInit {
    @ViewChildren('link')  link : QueryList<ElementRef>;
    demandes: any;
    demandesFiltered: any;
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
     * @param {FaqService} _demandesService
     */
    constructor(
        private _demandesService: DemandeService,
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
        this._demandesService.onDemandesChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((response) => {
                this.demandes = response;

                this.demandesFiltered = response;
            });

        this.searchInput.valueChanges
            .pipe(
                takeUntil(this._unsubscribeAll),
                debounceTime(300),
                distinctUntilChanged()
            )
            .subscribe((searchText) => {
                this.demandesFiltered = FuseUtils.filterArrayByString(
                    this.demandes,
                    searchText
                );
            });
    }
    ngAfterContentInit(): void {
        // this.user = this.loginService.user.role;
    }

    ngAfterViewInit(): void {
        this.link.forEach(p => p.nativeElement.addEventListener("click", function(event) {
                event.stopImmediatePropagation();
            }, true))
        // .first.for.
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

    newDemande() {
        this.dialogRef = this._matDialog.open(DemandeFormDialogComponent, {
            panelClass: "demande-form-dialog",
        });

        this.dialogRef.afterClosed().subscribe((response: FormGroup) => {
            if (!response) {
                return;
            }
            const res = response.getRawValue();
            res.autre = res.type === 'Autre' ? res.autre : null ;
            this._demandesService.addDemande(res)
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
                     this._demandesService.deleteDemande(id)
                     
                 }
                 this.confirmDialogRef = null;
             });
     
         }
     
}
