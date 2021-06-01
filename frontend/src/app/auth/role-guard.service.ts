import { Injectable } from "@angular/core";
import { Router, CanActivate, ActivatedRouteSnapshot } from "@angular/router";
import { AuthService } from "./auth.service";
import decode from "jwt-decode";
@Injectable({
    providedIn: "root",
})
export class RoleGuardService implements CanActivate {
    constructor(public auth: AuthService, public router: Router) {}
    canActivate(route: ActivatedRouteSnapshot): boolean {
        // this will be passed from the route config
        // on the data property
        const expectedRole: string[] = route.data.expectedRole;
        const token = localStorage.getItem("data");
        // decode the token to get its payload
        if (
            !this.auth.isAuthenticated() ||
            !expectedRole.includes((<any>decode(token)).role)
        ) {
            this.router.navigate(["login"]);
            return false;
        }
        return true;
    }
}
