import { 
    HttpInterceptor,
    HttpEvent,
    HttpHandler,
    HttpRequest
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { exhaustMap, Observable } from "rxjs";
import { Store } from "@ngrx/store";
import { AppState } from "../store/app.state";
import { getToken } from "../auth/state/auth.selector";

@Injectable()
export class AuthTokenInterceptor implements HttpInterceptor {
    constructor(private store:Store<AppState>) {

    }

    intercept(req: HttpRequest<any>,next: HttpHandler): Observable<HttpEvent<any>> {
        return this.store.select(getToken).pipe(
            exhaustMap((token) => {
                if (!token) {
                    return next.handle(req);
                }
                let modifiedReq = req.clone({
                    params: req.params.append('auth', token),
                });
                return next.handle(modifiedReq);
            })
        );
    }
}
