import { HttpClient } from '@angular/common/http';
import { Location } from '@angular/common'
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class GestionMatiereService implements Resolve<any> {
   onModuleChanged: any; 
    semestre: any;
  /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     */
   constructor(private _httpClient: HttpClient, private toastr : ToastrService, private location: Location) {
    // Set the defaults
    this.onModuleChanged = new BehaviorSubject({});
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
          Promise.all([this.getSemestre(route.params.id)]).then((e) => {
              resolve(this.semestre);
          }, reject);
      });
  }

  getSemestre(semestre:number = 1): Promise<any[]>
  {
      return new Promise((resolve, reject) => {

          this._httpClient.get('http://localhost:3000/semestre/'+semestre)
              .subscribe((response: any) => {
                  this.semestre = response;
                //   this.onModuleChanged.next(this.semestre);
                  resolve(this.semestre);
              }, reject);
      });
  }
 }