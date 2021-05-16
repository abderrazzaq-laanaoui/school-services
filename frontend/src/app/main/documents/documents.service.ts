import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
    ActivatedRouteSnapshot,
    Resolve,
    RouterStateSnapshot,
} from "@angular/router";
import { Observable } from "rxjs";

@Injectable()
export class DocumentsService implements Resolve<any> {
    projects: any[];
    widgets: any[];
    contact: FormGroup;

    /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     */
    constructor(private _httpClient: HttpClient, private _formBuilder: FormBuilder) {}

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
        return new Promise<void>((resolve, reject) => {
            this.getWidgets().then(() => {  resolve(); }, reject);
        });
    }

    /**
     * Get widgets
     *
     * @returns {Promise<any>}
     */
    getWidgets(): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient
                .get("http://localhost:3300/widgets")
                .subscribe((response: any) => {
                    this.widgets = response;
                    resolve(response);
                }, reject);
        });
    }

    /**
     * populateDialog
     */
    public populateDialog(contact):void {
        this.contact =  this._formBuilder.group({
            cne       : [contact.cne,Validators.required],
            firstName : [ contact.fname, Validators.required],
            lastName  : [ contact.lname, Validators.required],
            email     : [ contact.email, Validators.required],
            number    : [ contact.email, Validators.required],
            date      : [ contact.date,  Validators.required],
            document  : [ contact.document,Validators.required],
            file      : [ undefined, Validators.required]
        });
  
        
    }
}
