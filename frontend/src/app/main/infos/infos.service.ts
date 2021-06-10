import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import {
    ActivatedRouteSnapshot,
    Resolve,
    RouterStateSnapshot,
} from "@angular/router";
import { BehaviorSubject, Observable } from "rxjs";
import { ToastrService } from "ngx-toastr";
@Injectable()
export class InfosService implements Resolve<any> {
   
    infos: any;
    onInfosChanged: BehaviorSubject<any>;

    /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     */
    constructor(private _httpClient: HttpClient, private toastr : ToastrService) {
        // Set the defaults
        this.onInfosChanged = new BehaviorSubject({});
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
            Promise.all([this.getInfos()]).then(() => {
                resolve();
            }, reject);
        });
    }

    /**
     * Get faqs
     */
    getInfos(): Promise<any[]> {
        return new Promise((resolve, reject) => {
            this._httpClient.get("http://localhost:3000/infos").subscribe((response: any) => {
                console.log(response);
                this.infos = response;
                this.onInfosChanged.next(this.infos);
                resolve(this.infos);
            }, reject);
        });
    }
       /**
     * Add Info
     */
    addInfo(info:{title:string,content:string,type:string}): Promise<any[]> {
        return new Promise((resolve, reject) => {
            this._httpClient.post("http://localhost:3000/infos",info).subscribe((response: any) => {
                this.toastr.success("L'info est bien ajouté")
                this.infos.push(response);
                this.onInfosChanged.next(this.infos);
                resolve(this.infos);
            }, reject=>{
                this.toastr.error(reject.error.message,"ERREUR")
            });
        });
    }

    deleteInfo(id: number) {
        return new Promise((resolve, reject) => {
            this._httpClient.delete("http://localhost:3000/infos/"+id).subscribe((response: any) => {
                if(response.affected <1){
                    this.toastr.error("Cette info ne peut pas être supprimer","ERREUR");
                    return;
                }
                
                this.toastr.success("L'info est bien supprimé")
                this.infos = this.infos.filter(i => i.id !== id)
                this.onInfosChanged.next(this.infos);
                resolve(this.infos);
            }, reject=>{
                this.toastr.error(reject.error.message,"ERREUR")
            });
        });
    }
}
