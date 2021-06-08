import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { fuseAnimations } from '@fuse/animations';

import { FuseUtils } from '@fuse/utils';

import { InfosService } from './infos.service';

@Component({
    selector     : 'info',
    templateUrl  : './infos.component.html',
    styleUrls    : ['./infos.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations

})
export class InfosComponent implements OnInit, OnDestroy
{
    infos: any;
    infosFiltered: any;
    step: number;
    searchInput: any;
    i = 0;

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {FaqService} _infosService
     */
    constructor(
        private _infosService: InfosService
    )
    {
        // Set the defaults
        this.searchInput = new FormControl('');
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
    ngOnInit(): void
    {
        this._infosService.onInfosChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(response => {
                this.infos = response;
                
                this.infosFiltered = response;
            });

        this.searchInput.valueChanges
            .pipe(
                takeUntil(this._unsubscribeAll),
                debounceTime(300),
                distinctUntilChanged()
            )
            .subscribe(searchText => {
                this.infosFiltered = FuseUtils.filterArrayByString(this.infos, searchText);
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

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Set step
     *
     * @param {number} index
     */
    setStep(index: number): void
    {
        this.step = index;
    }

    /**
     * Next step
     */
    nextStep(): void
    {
        this.step++;
    }

    /**
     * Previous step
     */
    prevStep(): void
    {
        this.step--;
    }
    newInfo(){
        console.log("new Info!");
        this._infosService.addInfo({title:`Info ${this.i}`,content:"this is the content if test infos",type:"general"})
        this.i++;
    }
}
