import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import {
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    CanActivate,
    UrlTree,
    Router,
} from "@angular/router";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { AppState } from "../store/app.state";
import { getAuthenticated } from "../auth/state/auth.selector";

@Injectable({
    providedIn: 'root',
})
export class AuthGuard implements CanActivate {
    constructor(private store: Store<AppState>, private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
        | boolean
        | UrlTree
        | Observable<boolean | UrlTree> {
        return this.store.select(getAuthenticated)
            .pipe(
                map((authenticated: boolean) => {
                    if (!authenticated) {
                        return this.router.createUrlTree(['auth']);
                    }
                    return true;
                })
            );
    }
}