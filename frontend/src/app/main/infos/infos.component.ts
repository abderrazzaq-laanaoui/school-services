import { Component, OnInit, OnDestroy, ViewEncapsulation, AfterContentInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { fuseAnimations } from '@fuse/animations';

import { FuseUtils } from '@fuse/utils';

import { InfosService } from './infos.service';
import { LoginService } from '../login/login.service';

@Component({
    selector     : 'info',
    templateUrl  : './infos.component.html',
    styleUrls    : ['./infos.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations

})
export class InfosComponent implements OnInit, OnDestroy, AfterContentInit
{
    infos: any;
    infosFiltered: any;
    step: number;
    searchInput: any;
    user: string;
    i = 0;

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {FaqService} _infosService
     */
    constructor(
        private _infosService: InfosService,
        private loginService : LoginService,

        
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
    ngAfterContentInit(): void {
        this.user = this.loginService.user.role;
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
        this._infosService.addInfo({
            title:`Info ${this.i}`,
            content:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae rem qui ducimus repellendus nisi maiores consequuntur totam quaerat, quos quod, ipsa inventore assumenda fugit expedita soluta nostrum! Recusandae, nisi deserunt ea esse ut facere excepturi? Repellendus nulla doloremque incidunt inventore amet eaque tempore, totam nesciunt nostrum iste assumenda sed voluptate error non quia unde tenetur itaque. Sapiente ducimus, ut necessitatibus ipsam rem accusantium repellat eveniet, vero harum molestias cum nisi? Ducimus expedita ex cumque inventore ipsa exercitationem hic deleniti iusto, commodi blanditiis pariatur voluptas labore assumenda rerum magnam harum aliquam optio nam neque voluptates tenetur ullam. Provident, nisi ut odio quos, aliquid, porro illum ab explicabo nam optio exercitationem tempora temporibus. Necessitatibus nulla, maxime officia tenetur consequuntur quo facilis nisi architecto labore repellat, nam error similique corrupti officiis? Laboriosam veritatis et amet fugit eos laudantium ipsum corrupti voluptatibus, aspernatur culpa voluptas? Consectetur deserunt aliquid officiis facilis ex error vel magni animi reiciendis, libero quam ea molestiae, officia assumenda sed reprehenderit, placeat voluptatem commodi dicta vero. Vero nesciunt esse deserunt nihil nulla cupiditate officia mollitia accusamus fugiat sed tempore molestiae sequi at, obcaecati recusandae ad corrupti ipsum alias ea. Nobis doloribus sint excepturi totam quos, modi fuga officia, tenetur, quam repellendus velit repudiandae saepe ipsum placeat repellat veritatis rem laborum. Facere, labore, ab atque quaerat ea laudantium repellendus tempore reprehenderit expedita, odio possimus praesentium vel id numquam amet eligendi. Quae quidem vitae cupiditate quibusdam voluptatibus esse eos officia ea quisquam illum! Totam, fuga aut, nemo repellat quod officia expedita doloremque eius delectus, aliquid laboriosam. Mollitia praesentium ducimus molestias accusantium enim iure tempora error, quaerat eaque eius magni sunt ea. Nulla ex blanditiis incidunt, reiciendis ratione, sint illum, laborum harum numquam adipisci molestias facere hic? Delectus deleniti quas labore fuga fugiat dolorum praesentium eum ut libero dolores, excepturi distinctio inventore? Quae blanditiis porro voluptates ab ex illum repellendus cupiditate veritatis in nulla a similique, placeat quis voluptatum maxime molestiae neque. Facere, facilis laudantium eveniet unde iure voluptate cupiditate ducimus fugiat vel, nesciunt labore dolor tenetur, optio nostrum dolore officiis ad esse. Cumque molestiae, veniam sed adipisci totam eum numquam ullam neque culpa quasi? Nam, tempore! Commodi repudiandae modi pariatur, nemo ut alias illum explicabo ex, porro sequi minima eum recusandae perspiciatis tenetur. Natus quidem expedita perferendis. Cumque porro laborum odit numquam hic delectus ullam, a sint, repellendus ut ex iusto quis minus magni incidunt neque laboriosam labore soluta. Voluptate repudiandae laborum quo laboriosam aperiam. Recusandae esse blanditiis dolore error eaque nostrum, reiciendis itaque amet dolorum quisquam quod consequatur voluptas, neque atque molestias assumenda saepe voluptatum aliquam animi ullam modi ab magni? Omnis molestias fugiat sint in quasi? Veniam possimus dicta perferendis aliquam eveniet magni hic explicabo inventore expedita. Illum in deleniti voluptate ipsum tempora suscipit, eaque excepturi velit distinctio eligendi dolorum assumenda maxime expedita cumque iusto nobis, consectetur pariatur magnam repudiandae quas praesentium libero quos. Maiores asperiores eveniet sed consectetur accusamus atque, consequuntur veritatis est inventore facilis quod tenetur voluptatibus cumque eaque incidunt. Facilis sequi suscipit ipsa ullam sint labore libero dignissimos!",
            type:"general"})
        this.i++;
    }
}
