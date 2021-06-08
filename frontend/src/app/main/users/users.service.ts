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
    onSelectedUsersChanged: BehaviorSubject<any>;
    onUserDataChanged: BehaviorSubject<any>;
    onSearchTextChanged: Subject<any>;
    onFilterChanged: Subject<any>;

    users: User[];
    user: any;
    selectedUsers: string[] = [];

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
        this.onSelectedUsersChanged = new BehaviorSubject([]);
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

    /**
     * Toggle selected user by id
     *
     * @param id
     */
    toggleSelectedUser(id): void
    {
        // First, check if we already have that user as selected...
        if ( this.selectedUsers.length > 0 )
        {
            const index = this.selectedUsers.indexOf(id);

            if ( index !== -1 )
            {
                this.selectedUsers.splice(index, 1);

                // Trigger the next event
                this.onSelectedUsersChanged.next(this.selectedUsers);

                // Return
                return;
            }
        }

        // If we don't have it, push as selected
        this.selectedUsers.push(id);

        // Trigger the next event
        this.onSelectedUsersChanged.next(this.selectedUsers);
    }

    /**
     * Toggle select all
     */
    toggleSelectAll(): void
    {
        if ( this.selectedUsers.length > 0 )
        {
            this.deselectUsers();
        }
        else
        {
            this.selectUsers();
        }
    }

    /**
     * Select users
     *
     * @param filterParameter
     * @param filterValue
     */
    selectUsers(filterParameter?, filterValue?): void
    {
        this.selectedUsers = [];
 
        // If there is no filter, select all users
        if ( filterParameter === undefined || filterValue === undefined )
        {
            this.selectedUsers = [];
            this.users.map(user => {
                this.selectedUsers.push(user.id);
            });
        }

        // Trigger the next event
        this.onSelectedUsersChanged.next(this.selectedUsers);
    }

    addUser(res: User) {
        return new Promise((resolve, reject) => {
            const type = res.type.toLowerCase()
            let data;
            if(type === 'etudiant')
               data =  _.pick(res,'cne','cin','nom', 'prenom', 'email','password');
            else
                data =  _.pick(res,'cin','nom', 'prenom', 'email','password');

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
     * Deselect users
     */
    deselectUsers(): void
    {
        this.selectedUsers = [];

        // Trigger the next event
        this.onSelectedUsersChanged.next(this.selectedUsers);
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

    /**
     * Delete selected users
     */
    deleteSelectedUsers(): void
    {
        
        for ( const userId of this.selectedUsers )
        {
            const user = this.users.find(_user => {
                _user.id === userId;
            });

            this.deleteUser(user);
            const userIndex = this.users.indexOf(user);

            this.users.splice(userIndex, 1);
        }
        this.onUsersChanged.next(this.users);
        this.deselectUsers();
    }

}
