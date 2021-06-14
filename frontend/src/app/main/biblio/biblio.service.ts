import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class BiblioService implements Resolve<any>
{
    
    knowledgeBase: any;
    onKnowledgeBaseChanged: BehaviorSubject<any>;

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
        this.onKnowledgeBaseChanged = new BehaviorSubject({});
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
                this.getArticles()
            ]).then(
                () => {
                    resolve();
                },
                reject
            );
        });
    }

    /**
     * Get knowledge base
     */
    getArticles(): Promise<any[]>
    {
        return new Promise((resolve, reject) => {

            this._httpClient.get('http://localhost:3300/biblio')
                .subscribe((response: any) => {
                    this.knowledgeBase = response;
                    this.onKnowledgeBaseChanged.next(this.knowledgeBase);
                    resolve(this.knowledgeBase);
                }, reject);
        });
    }
    
    addArtice(e: any) {
        console.log(e);
        
    }
    deleteArticle(id:number){
        console.log(id);
        
    }
}
