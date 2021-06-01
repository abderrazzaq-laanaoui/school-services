import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

@Injectable({
    providedIn: "root",
})
export class LoginService {
    private url: string;

    constructor(private httpClient: HttpClient, private router: Router) {
        this.url = "http://localhost:3000/user/SignIn";
    }

    signIn(email: string, password: string) {
       return  this.httpClient.post(this.url, { email, password }).subscribe(
            (res: { accessToken: string }) => {
                this.setToken(res.accessToken);
                this.router.navigateByUrl('/home');
            },
            (err) => {
        }
        );
    }

    setToken(token: string) {
        localStorage.setItem("data", token);
    }
    getToken() {
        return localStorage.getItem("data");
    }
}
