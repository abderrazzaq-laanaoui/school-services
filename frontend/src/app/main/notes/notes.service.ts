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

@Injectable({
  providedIn: 'root'
})
export class NotesService implements Resolve<any> {
    
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
                Promise.all([this.getNotes(route.params.id,route.params.semestre)]).then(() => {
                    resolve();
                }, reject);            
        });
    }



    /**
     * Get about
     */
    getNotes(id:number,semestre:number): Promise<any[]> {
        
        return new Promise((resolve, reject) => {
            this._httpClient
                .get(`http://localhost:3000/notes/${id}/${semestre}`)
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

    updateNotes(id: number, semestre:number,notes: any[]) {
        return new Promise((resolve, reject) => {
            this._httpClient
                .patch(`http://localhost:3000/notes/${id}/${semestre}`,notes)
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
    
 
}
