import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { ToastrService } from 'ngx-toastr';
import {FuseNavigationService} from '@fuse/components/navigation/navigation.service';
import decode from "jwt-decode";
@Injectable({
    providedIn: "root",
})
export class LoginService {
    private url: string;
    public user: {id:string; nom: string; prenom: string; email: string , role:string, avatar: string};

    constructor(
        private httpClient: HttpClient,
        private router: Router,
        private toastr: ToastrService,
        private _fuseNavigationService: FuseNavigationService
        ) {
        this.url = "http://localhost:3000/user/login";
        this.setUser();

    }
    
    
    signIn(email: string, password: string) {
        return this.httpClient.post(this.url, { email, password }).subscribe(
            (res: { accessToken: string }) => {
                this.setToken(res.accessToken);
                this.setUser();
                this._fuseNavigationService.setCurrentNavigation(this.user.role.toLowerCase());
                this.router.navigateByUrl("/home");
            },
            (res) => {                
                this.toastr.error(res.error.message,'Erreur');
            }
        );
    }
    logOut(){
        localStorage.clear();
        this.router.navigateByUrl("/login");
    }
    setUser() {
        try{
        const  {id, nom, prenom, email, role, avatar } = <any>decode(this.getToken());
        this.user = {id, nom, prenom, email,role, avatar };
        }catch(e){ this.user = {id:"", nom:"",prenom:"",email:"", role:"", avatar:""}}
    }

    setToken(token: string) {
        localStorage.setItem("data", token);
    }
    getToken() {
        return localStorage.getItem("data");
    }
}
