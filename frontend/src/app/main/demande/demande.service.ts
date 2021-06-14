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
export class DemandeService implements Resolve<any> {
    demandes: any;
    onDemandesChanged: BehaviorSubject<any>;

    /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     */
    constructor(
        private _httpClient: HttpClient,
        private toastr: ToastrService
    ) {
        // Set the defaults
        this.onDemandesChanged = new BehaviorSubject({});
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
            Promise.all([this.getDemandes()]).then(() => {
                resolve();
            }, reject);
        });
    }

    /**
     * Get faqs
     */
    getDemandes(): Promise<any[]> {
        return new Promise((resolve, reject) => {
            this._httpClient
                .get("http://localhost:3000/demande")
                .subscribe((response: any) => {
                    this.demandes = response;
                    this.onDemandesChanged.next(this.demandes);
                    resolve(this.demandes);
                }, reject);
        });
    }
    /**
     * Add Demande
     */
    addDemande(demande: any): Promise<any[]> {
        return new Promise((resolve, reject) => {
            this._httpClient
                .post("http://localhost:3000/demande", demande)
                .subscribe(
                    (response: any) => {
                        this.toastr.success("L'demande est bien ajouté");
                        this.demandes.push(response);
                        this.onDemandesChanged.next(this.demandes);
                        resolve(this.demandes);
                    },
                    (reject) => {
                        this.toastr.error(reject.error.message, "ERREUR");
                    }
                );
        });
    }

    deleteDemande(id: number) {
        return new Promise((resolve, reject) => {
            this._httpClient
                .delete("http://localhost:3000/demande/" + id)
                .subscribe(
                    (response: any) => {
                        if (response.affected < 1) {
                            this.toastr.error(
                                "Cette demande ne peut pas être supprimer",
                                "ERREUR"
                            );
                            return;
                        }

                        this.toastr.success("L'demande est bien supprimé");
                        this.demandes = this.demandes.filter(
                            (i) => i.id !== id
                        );
                        this.onDemandesChanged.next(this.demandes);
                        resolve(this.demandes);
                    },
                    (reject) => {
                        this.toastr.error(reject.error.message, "ERREUR");
                    }
                );
        });
    }
}
