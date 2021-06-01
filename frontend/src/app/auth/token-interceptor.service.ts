import { Injectable, Injector } from "@angular/core";
import {
    HttpErrorResponse,
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
} from "@angular/common/http";
import { LoginService } from "../main/login/login.service";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import {tap} from 'rxjs/operators';

@Injectable({
    providedIn: "root",
})
export class TokenInterceptorService implements HttpInterceptor {
    constructor(private injector: Injector, private router : Router) {}

    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        let loginService = this.injector.get(LoginService);
        let tokenizeReq = req.clone({
            setHeaders: {
                Authorization: `Bearer ${loginService.getToken()}`,
            },
        });
        return (next.handle(tokenizeReq)).pipe( tap(() => {},
        (err: any) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status !== 401) {
           return;
          }
          this.router.navigate(['login']);
        }
      }));
    }
}
