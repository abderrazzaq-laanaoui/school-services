import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import {
    ActivatedRouteSnapshot,
    Resolve,
    Router,
    RouterStateSnapshot,
} from "@angular/router";
import { BehaviorSubject, Observable } from "rxjs";
import { ToastrService } from "ngx-toastr";

@Injectable()
export class ProfileService implements Resolve<any> {
   
    private _user: any;
    aboutOnChanged: BehaviorSubject<any>;

    get user():any{
        return this._user;
    }
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
                    this._user = data;                    
                    this.aboutOnChanged.next(this._user);
                    resolve(this._user);
                }, reject=> {
                        this.toastr.error("Page non trouvé", "ERREUR")
                        this.router.navigateByUrl('home')
                });
        });
    }
    updatePassword(id: number, data: { old_password: string; new_password: string; }) {
        return new Promise((resolve, reject) => {
            this._httpClient
                .patch(`http://localhost:3000/user/password/${id}`,data)
                .subscribe(
                    () => {
                    this.toastr.info("Le mot de passe est bien modifier") ;              
                    resolve(null);
                }, reject=> {
                    this.toastr.error(reject.message, "ERREUR")
                });
    });    
}
    
    resetPassword(id: number) {
         return new Promise((resolve, reject) => {
            this._httpClient
                .patch(`http://localhost:3000/user/password`,{id})
                .subscribe(
                    () => {
                    this.toastr.info("Le mot de passe est bien réinitialiser");              
                    resolve(null);
                }, reject=> {
                    this.toastr.error(reject.message, "ERREUR")
                });
    }); 
    }

    updateAvatar(id: number, avatar: string | ArrayBuffer) {
        return new Promise((resolve, reject) => {
            this._httpClient
                .patch("http://localhost:3000/user/avatar/ " + id,{avatar})
                .subscribe(
                    (data: any) => {
                    this._user.avatar = data.avatar;     
                    this.toastr.info("L'image est bien modifier, rafraichit la page pour appliquer les modification dans tout l'application") ;              
                    this.aboutOnChanged.next(this._user);
                    resolve(this._user);
                }, reject=> {
                    this.toastr.error(reject.message, "ERREUR")
                        //this.router.navigateByUrl('home')
                });
    });}
    getUserAvatar(id: number){
         
    }
    
}
