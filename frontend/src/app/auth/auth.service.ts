import { Injectable } from "@angular/core";
import { JwtHelperService } from "@auth0/angular-jwt";
@Injectable({
    providedIn: "root",
})
export class AuthService {
    
    constructor(public jwtHelper: JwtHelperService) {}
    // ...
    public isAuthenticated(): boolean {
        const token = localStorage.getItem("data");
        try {
            return token && !this.jwtHelper.isTokenExpired(token);
        } catch (e) {
            return false;
        }
    }
}
