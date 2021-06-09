import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import {
    ActivatedRoute,
    ActivatedRouteSnapshot,
    Resolve,
    Router,
    RouterStateSnapshot,
} from "@angular/router";
import { BehaviorSubject, Observable } from "rxjs";
import { ToastrService } from "ngx-toastr";

@Injectable()
export class ProfileService implements Resolve<any> {
    
    user: any;
    aboutOnChanged: BehaviorSubject<any>;

    /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     */
    constructor(private _httpClient: HttpClient, private router : Router, private toastr: ToastrService) {
        // Set the defaults
        this.aboutOnChanged = new BehaviorSubject({});
    }

    /**
     * Resolver
     *
     * @param {ActivatedRouteSnapshot} route
     * @param {RouterStateSnapshot} state
     * @returns {Observable<any> | Promise<any> | any}
     */
    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<any> | Promise<any> | any {
        return new Promise((resolve, reject) => {                
                Promise.all([this.getAbout(route.params.id)]).then(() => {
                    resolve();
                }, reject);            
        });
    }



    /**
     * Get about
     */
    getAbout(id:number): Promise<any[]> {
        
        return new Promise((resolve, reject) => {
            this._httpClient
                .get("http://localhost:3000/user/" + id)
                .subscribe((data: any) => {
                    this.user = data;                    
                    this.aboutOnChanged.next(this.user);
                    resolve(this.user);
                }, reject=> {
                        this.toastr.error("Page non trouvé", "ERREUR")
                        this.router.navigateByUrl('home')
                });
        });
    }
    updateAvatar(id: number, avatar: string | ArrayBuffer) {
        return new Promise((resolve, reject) => {
            this._httpClient
                .patch("http://localhost:3000/user/avatar/ " + id,{avatar})
                .subscribe(
                    (data: any) => {
                    this.user.avatar = data.avatar;                    
                    this.aboutOnChanged.next(this.user);
                    resolve(this.user);
                }, reject=> {
                    this.toastr.error(reject.message, "ERREUR")
                        //this.router.navigateByUrl('home')
                });
        });    }
}
