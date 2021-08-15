import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class SeanceService implements Resolve<any>
{
    private readonly API = "http://localhost:3000";
   
    matieres: any;
    about: any;
    photosVideos: any;

    matieresOnChanged: BehaviorSubject<any>;
    aboutOnChanged: BehaviorSubject<any>;
    photosVideosOnChanged: BehaviorSubject<any>;

    /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     */
    constructor(
        private _httpClient: HttpClient
    )
    {
        // Set the defaults
        this.matieresOnChanged = new BehaviorSubject({});
        this.aboutOnChanged = new BehaviorSubject({});
        this.photosVideosOnChanged = new BehaviorSubject({});
    }

    /**
     * Resolver
     *
     * @param {ActivatedRouteSnapshot} route
     * @param {RouterStateSnapshot} state
     * @returns {Observable<any> | Promise<any> | any}
     */
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any
    {
        return new Promise((resolve, reject) => {
            Promise.all([
                this.getMatieres(),
                this.getAbout(),
            ]).then(
                () => {
                    resolve();
                },
                reject
            );
        });
    }

    /**
     * Get timeline
     */
    getMatieres(): Promise<any[]>
    {
        return new Promise((resolve, reject) => {

            this._httpClient.get(`${this.API}/matiere`)
                .subscribe((timeline: any) => {
                    this.matieres = timeline;
                    this.matieresOnChanged.next(this.matieres);
                    resolve(this.matieres);
                }, reject);
        });
    }

    /**
     * Get about
     */
    getAbout(): Promise<any[]>
    {
        return null;
        new Promise((resolve, reject) => {

            this._httpClient.get(`api/profile-about`)
                .subscribe((about: any) => {
                    this.about = about;
                    this.aboutOnChanged.next(this.about);
                    resolve(this.about);
                }, reject);
        });
    }

    getStudentList(lcs: any): any {
        return new Promise((resolve, reject) => {
            this._httpClient.get(`${this.API}/ligne-classe-semestre/liste-etudiants/${lcs}`)
                .subscribe((about: any) => {
                    this.about = about; 
                    this.aboutOnChanged.next(this.about);
                    resolve(this.about);
                }, reject);
        });
    }

}
