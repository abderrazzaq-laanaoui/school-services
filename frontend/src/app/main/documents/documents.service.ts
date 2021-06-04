import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import {
    ActivatedRouteSnapshot,
    Resolve,
    Router,
    RouterStateSnapshot,
} from "@angular/router";
import { Observable } from "rxjs";

@Injectable()
export class DocumentsService implements Resolve<any> {
    projects: any[];
    data = {
        title: "Demandes des documents",
        table: {
            columns: [
                "avatar",
                "nom",
                "cin",
                "email",
                "date",
                "document",
                "action",
            ],
            rows: [],
        },
    };
    contactForm: FormGroup;

    /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     */
    constructor(
        private router: Router,
        private _httpClient: HttpClient,
        private _formBuilder: FormBuilder
    ) {}

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
            this.getWidgets().then(() => {
                resolve();
            }, reject);
        });
    }

    /**
     * Get widgets
     *
     * @returns {Promise<any>}
     */
    getWidgets(): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient.get("http://localhost:3000/demande").subscribe(
                (response: any) => {
                    this.data.table.rows = response;
                    resolve(response);
                },
                (reject) => {
                    this.router.navigateByUrl("home");
                }
            );
        });
    }

    /**
     * populateDialog
     */
    public populateDialog(request): void {
        this.contactForm = this._formBuilder.group({
            cne: [request.etudiant.cne || "-", Validators.required],
            cin: [request.etudiant.cin, Validators.required],
            firstName: [request.etudiant.prenom, Validators.required],
            lastName: [request.etudiant.nom, Validators.required],
            email: [request.etudiant.email, Validators.required],
            date: [request.date.slice(0, 10), Validators.required],
            document: [request.type || request.autre, Validators.required],
            motif: [request.motif || "-", Validators.required],
            file: [undefined, Validators.required],
        });
    }

    /**
     * resetFormGroup
     */
    public resetFormGroup() {
        this.contactForm = this._formBuilder.group({
            cne: ["", Validators.required],
            firstName: ["", Validators.required],
            lastName: ["", Validators.required],
            email: ["", Validators.required],
            date: ["", Validators.required],
            document: ["", Validators.required],
            file: [undefined, Validators.required],
        });
    }
}
