import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { setupMaster } from "cluster";
import decode from "jwt-decode";
@Injectable({
    providedIn: "root",
})
export class LoginService {
    private url: string;
    user: {id:string; nom: string; prenom: string; email: string };

    constructor(private httpClient: HttpClient, private router: Router) {
        this.url = "http://localhost:3000/user/SignIn";
        this.setUser();

    }

    signIn(email: string, password: string) {
        return this.httpClient.post(this.url, { email, password }).subscribe(
            (res: { accessToken: string }) => {
                this.setToken(res.accessToken);
                this.setUser();
                this.router.navigateByUrl("/home");
            },
            (err) => {}
        );
    }
    logOut(){
        localStorage.clear();
        this.router.navigateByUrl("/login");
    }
    setUser() {
        try{
        const  {id, nom, prenom, email } = <any>decode(this.getToken());
        this.user = {id, nom, prenom, email };
        }catch(e){ this.user = {id:"", nom:"",prenom:"",email:""}}
    }

    setToken(token: string) {
        localStorage.setItem("data", token);
    }
    getToken() {
        return localStorage.getItem("data");
    }
}
