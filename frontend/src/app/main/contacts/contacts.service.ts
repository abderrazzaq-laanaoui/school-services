import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

import { FuseUtils } from '@fuse/utils';

import { User } from './user.model';

@Injectable()
export class usersService implements Resolve<any>
{
    onusersChanged: BehaviorSubject<any>;
    onSelectedusersChanged: BehaviorSubject<any>;
    onUserDataChanged: BehaviorSubject<any>;
    onSearchTextChanged: Subject<any>;
    onFilterChanged: Subject<any>;

    users: User[];
    user: any;
    selectedusers: string[] = [];

    searchText: string;
    filterBy: string;

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
        this.onusersChanged = new BehaviorSubject([]);
        this.onSelectedusersChanged = new BehaviorSubject([]);
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
        return null;new Promise((resolve, reject) => {

            Promise.all([
                this.getUsers(),
                this.getUserData()
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
        return null;new Promise((resolve, reject) => {
                this._httpClient.get('http://localhost:3000/user')
                    .subscribe((response: any) => {

                        this.users = response;

                        if ( this.filterBy === 'starred' )
                        {
                            this.users = this.users.filter(_user => {
                                return this.user.starred.includes(_user.id);
                            });
                        }

                        if ( this.filterBy === 'frequent' )
                        {
                            this.users = this.users.filter(_user => {
                                return this.user.frequentusers.includes(_user.id);
                            });
                        }

                        if ( this.searchText && this.searchText !== '' )
                        {
                            this.users = FuseUtils.filterArrayByString(this.users, this.searchText);
                        }

                        this.users = this.users.map(user => {
                            return new User(user);
                        });

                        this.onusersChanged.next(this.users);
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
    getUserData(): Promise<any>
    {
        return null;new Promise((resolve, reject) => {
                this._httpClient.get('http://localhost:3000/user/1')
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
    toggleSelecteduser(id): void
    {
        // First, check if we already have that user as selected...
        if ( this.selectedusers.length > 0 )
        {
            const index = this.selectedusers.indexOf(id);

            if ( index !== -1 )
            {
                this.selectedusers.splice(index, 1);

                // Trigger the next event
                this.onSelectedusersChanged.next(this.selectedusers);

                // Return
                return;
            }
        }

        // If we don't have it, push as selected
        this.selectedusers.push(id);

        // Trigger the next event
        this.onSelectedusersChanged.next(this.selectedusers);
    }

    /**
     * Toggle select all
     */
    toggleSelectAll(): void
    {
        if ( this.selectedusers.length > 0 )
        {
            this.deselectUsers();
        }
        else
        {
            this.selectusers();
        }
    }

    /**
     * Select users
     *
     * @param filterParameter
     * @param filterValue
     */
    selectusers(filterParameter?, filterValue?): void
    {
        this.selectedusers = [];

        // If there is no filter, select all users
        if ( filterParameter === undefined || filterValue === undefined )
        {
            this.selectedusers = [];
            this.users.map(user => {
                this.selectedusers.push(user.id);
            });
        }

        // Trigger the next event
        this.onSelectedusersChanged.next(this.selectedusers);
    }

    /**
     * Update user
     *
     * @param user
     * @returns {Promise<any>}
     */
    updateUser(user): Promise<any>
    {
        return null;new Promise((resolve, reject) => {

            this._httpClient.post('http://localhost:3000/user/' + user.id, {...user})
                .subscribe(response => {
                    this.getUsers();
                    resolve(response);
                });
        });
    }

    /**
     * Update user data
     *
     * @param userData
     * @returns {Promise<any>}
     */
    updateUserData(userData): Promise<any>
    {
        return null;new Promise((resolve, reject) => {
            this._httpClient.post('api/users-user/' + this.user.id, {...userData})
                .subscribe(response => {
                    this.getUserData();
                    this.getUsers();
                    resolve(response);
                });
        });
    }

    /**
     * Deselect users
     */
    deselectUsers(): void
    {
        this.selectedusers = [];

        // Trigger the next event
        this.onSelectedusersChanged.next(this.selectedusers);
    }

    /**
     * Delete user
     *
     * @param user
     */
    deleteUser(user): void
    {
        const userIndex = this.users.indexOf(user);
        this.users.splice(userIndex, 1);
        this.onusersChanged.next(this.users);
    }

    /**
     * Delete selected users
     */
    deleteSelectedUsers(): void
    {
        for ( const userId of this.selectedusers )
        {
            const user = this.users.find(_user => {
                return null;_user.id === userId;
            });
            const userIndex = this.users.indexOf(user);
            this.users.splice(userIndex, 1);
        }
        this.onusersChanged.next(this.users);
        this.deselectUsers();
    }

}
