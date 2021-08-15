import { HttpClient } from "@angular/common/http";
import { Location } from "@angular/common";
import { Injectable } from "@angular/core";
import {
    ActivatedRouteSnapshot,
    Resolve,
    RouterStateSnapshot,
} from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { BehaviorSubject, Observable } from "rxjs";
import * as _ from "lodash";

@Injectable()
export class GestionMatiereService implements Resolve<any> {
    onSemestreChanged: any;
    onProfesseursChanged: any;
    semestre: any;
    professeurs: [];
    /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     */
    constructor(
        private _httpClient: HttpClient,
        private toastr: ToastrService,
        private location: Location
    ) {
        // Set the defaults
        this.onSemestreChanged = new BehaviorSubject({});
        this.onProfesseursChanged = new BehaviorSubject({});
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
            Promise.all([
                this.getSemestre(route.params.id),
                this.getProfesseurs(),
            ]).then((e) => {
                resolve(this.semestre);
            }, reject);
        });
    }

    getSemestre(semestreId: number): Promise<any[]> {
        return new Promise((resolve, reject) => {
            this._httpClient
                .get("http://localhost:3000/semestre/" + semestreId)
                .subscribe((response: any) => {
                    this.semestre = response;
                    this.onSemestreChanged.next(this.semestre);
                    resolve(this.semestre);
                }, reject);
        });
    }

    getProfesseurs(): Promise<any[]> {
        return  new Promise((resolve, reject) => {
            this._httpClient
                .get("http://localhost:3000/user/professeurs")
                .subscribe((response: any) => {
                    this.professeurs = response;
                    this.onProfesseursChanged.next(this.professeurs);
                    resolve(this.professeurs);
                }, reject);
        });
    }

    // send delete request to delete matiere with id
    deleteMatiere(id: number) {
        return this._httpClient.delete(`http://localhost:3000/matiere/${id}`);
    }
    // send patch request to update matiere with id
    updateMatiere(matiere: any): any {
        return this._httpClient.patch(
            `http://localhost:3000/matiere/${matiere.id}`,
            _.omit(matiere, "id")
        );
    }

    // add module
    addModule( module: { nom: string, semestreId }) {
        return this._httpClient.post(
            `http://localhost:3000/module`,
            module
        );
    }

    // add matiere
    addMatiere(
        matiere: { nom: string; professeurId: number; coefficient: number; moduleId: number }
    ) {
        return this._httpClient.post(
            `http://localhost:3000/matiere`,
            matiere
        );
    }
}
