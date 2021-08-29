import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import * as _ from 'lodash';
import { ToastrService } from 'ngx-toastr';
import { FuseUtils } from '@fuse/utils';
import { User } from './user.model';

@Injectable()
export class UsersService implements Resolve<any>
{
    
    onUsersChanged: BehaviorSubject<any>;
    onUserDataChanged: BehaviorSubject<any>;
    onSearchTextChanged: Subject<any>;
    onFilterChanged: Subject<any>;

    users: User[];
    user: any;

    searchText: string;
    filterBy: string;

    /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     */
    constructor(
        private _httpClient: HttpClient,
        private toastr: ToastrService
    )
    {
        // Set the defaults
        this.onUsersChanged = new BehaviorSubject([]);
        this.onUserDataChanged = new BehaviorSubject([]);
        this.onSearchTextChanged = new Subject();
        this.onFilterChanged = new Subject();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Resolver
     *
     * @param {ActivatedRouteSnapshot} route
     * @param {RouterStateSnapshot} state
     * @returns {Observable<any> | Promise<any> | any}
     */
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any
    {
        new Promise((resolve, reject) => {

            Promise.all([
                this.getUsers(),
                // this.getUserData()
            ]).then(
                ([files]) => {

                    this.onSearchTextChanged.subscribe(searchText => {
                        this.searchText = searchText;
                        this.getUsers();
                    });

                    this.onFilterChanged.subscribe(filter => {
                        this.filterBy = filter;
                        this.getUsers();
                    });

                    resolve();

                },
                reject
            );
        });
    }

    /**
     * Get users
     *
     * @returns {Promise<any>}
     */
    getUsers(): Promise<any>
    {
        return new Promise((resolve, reject) => {
                this._httpClient.get('http://localhost:3000/user/list')
                    .subscribe((response: any) => {                      

                        this.users = response;

                        if ( this.filterBy === 'admins' )
                        {
                            this.users = this.users.filter(_user => _user.type === 'Admin');
                        }else if ( this.filterBy === 'etudiants' )
                        {
                            this.users = this.users.filter(_user => _user.type ==='Etudiant');
                        }else if ( this.filterBy === 'professeurs' )
                        {
                            this.users = this.users.filter(_user => _user.type ==='Professeur');
                        }
                         if ( this.searchText && this.searchText !== '' )
                        {
                            this.users = FuseUtils.filterArrayByString(this.users, this.searchText);
                        }

                        this.users = this.users.map(user => {
                            return new User(user);
                        });

                        this.onUsersChanged.next(this.users);
                        resolve(this.users);
                    }, reject);
            }
        );
    }

    /**
     * Get user data
     *
     * @returns {Promise<any>}
     */
    getUserData(id:number): Promise<any>
    {
        return new Promise((resolve, reject) => {
                this._httpClient.get('http://localhost:3000/user/'+id)
                    .subscribe((response: any) => {
                        this.user = response;
                        this.onUserDataChanged.next(this.user);
                        resolve(this.user);
                    }, reject);
            }
        );
    }

   

    addUser(res: User) {
        return new Promise((resolve, reject) => {
            const type = res.type.toLowerCase()
            let data = {};
            if(res.tel === "")
                data =  _.omit(res,'tel');
            if(res.adresse === "")
                data =  _.omit(data,'adresse');
            if(type !== 'etudiant')
                data =  _.omit(data,'cne');
            
            this._httpClient.post('http://localhost:3000/user/'+type , {...data})
                .subscribe(response => {
                    this.toastr.success("L'utilisateur a été bien ajouté");
                      this.getUsers();
                    resolve(response);
                },
                (err:any)=>{
                    this.toastr.error(err.error.message,'Erreur');
                });
        });    }
    /**
     * Update user
     *
     * @param user
     * @returns {Promise<any>}
     */
    updateUser(user): Promise<any>
    {
        
        return new Promise((resolve, reject) => {

            this._httpClient.patch('http://localhost:3000/user/' + user.id, {...user})
                .subscribe(response => {
                    this.toastr.success("L'utilisateur a été bien modifier");
                    this.getUsers();
                    resolve(response);
                },
                (err:any)=>{
                    this.toastr.error(err.error.message,'Erreur');
                });
        });
    }


    /**
     * Delete user
     *
     * @param user
     */
    deleteUser(user): void
    {
        const userIndex = this.users.indexOf(user);
        this._httpClient.delete("http://localhost:3000/user/"+user.id).subscribe(
            (e)=>{
                this.toastr.success("L'utilisateur a été bien supprimer");
                this.users.splice(userIndex, 1);
                this.onUsersChanged.next(this.users);
            },
            (err:any)=>{
                this.toastr.error(err.error.message,'Erreur');
            }
        )
    }

    

}
