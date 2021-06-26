import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { fuseAnimations } from '@fuse/animations';
import { SeanceService } from '../../../seances/seance.service';
import { NgxMaterialTimepickerTheme } from "ngx-material-timepicker";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector     : '[seance-info]',
    templateUrl  : './info.component.html',
    styleUrls    : ['./info.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class InfoComponent implements OnInit, OnDestroy
{
    about: any;
    costumTheme: NgxMaterialTimepickerTheme = {
        container: {
            buttonColor: '#000',  
        },
        dial: {
            dialBackgroundColor: '#008000',
        },
        clockFace: {
            clockFaceBackgroundColor: '#F0F0F0',
            clockHandColor: '#008000',
        }
    };
    // Private
    private _unsubscribeAll: Subject<any>;
    infoFormGroup: FormGroup;

    /**
     * Constructor
     *
     * @param {SeanceService} _seanceService
     */
    constructor(
        private _seanceService: SeanceService,
        private _formBuilder: FormBuilder
    )
    {
        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        this._seanceService.aboutOnChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(about => {
                this.about = about;
            });
            this.infoFormGroup = this._formBuilder.group({
                heureDebut: ["", Validators.required],
                heureFin: ["", Validators.required],     
                matiere: ["", Validators.required],     
                date: ["", Validators.required],     
               });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }
}
