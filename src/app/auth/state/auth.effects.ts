import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { exhaustMap, map, catchError, tap, mergeMap } from "rxjs/operators";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";

import { loginStart, loginFail, loginSuccess, signUpStart, signUpSuccess, autoLogin, autoLogout } from "./auth.actions";
import { AuthService } from "../../services/auth.service";
import { User } from "../../models/user.model";
import { AuthResponseData } from "../../models/authResponseData.model";
import { AppState } from "../../store/app.state";
import { setErrorMessage, setLoadingSpinner } from "../../store/shared/shared.actions";
import { HttpErrorResponse } from "@angular/common/http";


@Injectable()
export class AuthEffects {
    constructor(
        private actions$: Actions,
        private authService: AuthService,
        private router: Router,
        private store: Store<AppState>) {
    }

    login$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(loginStart),
            exhaustMap((action) => {
                console.log(`In auth effects ${action.type}`);
                return this.authService.login(action.email, action.password)
                    .pipe(map((data: AuthResponseData) => {
                        const userAuthData: User = this.authService.formatData(data);
                        this.authService.setUserInLocalStorage(userAuthData);
                        return loginSuccess({ user: userAuthData, redirect: true});
                    }),
                        catchError((errResponse: HttpErrorResponse) => {
                            const errMessage = errResponse.error.error.message;
                            this.store.dispatch(setLoadingSpinner({ status: false }));
                            const message = this.authService.formatErrorMessage(errMessage);
                            return of(setErrorMessage({ message: message }));
                        })
                    );
            }),
        );
    });

    redirect$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(...[loginSuccess, signUpSuccess]),
            tap((action) => {
                this.store.dispatch(setLoadingSpinner({ status: false }));
                this.store.dispatch(setErrorMessage({ message: '' }));
                console.log(`In auth effects ${action.type}`);
                if(action.redirect) {
                    this.router.navigate(["/"]);
                }
            })
        );
    }, { dispatch: false });

    signUp$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(signUpStart),
            exhaustMap((action) => {
                console.log(`In auth effects ${action.type}`);
                return this.authService.signUp(action.email, action.password)
                    .pipe(
                        map((data: AuthResponseData) => {
                            const user: User = this.authService.formatData(data);
                            this.authService.setUserInLocalStorage(user);
                            return signUpSuccess({ user: user, redirect: true });
                        }),
                        catchError((errResponse: HttpErrorResponse) => {
                            const errMessage: string = errResponse.error.error.message;
                            this.store.dispatch(setLoadingSpinner({ status: false }));
                            const message = this.authService.formatErrorMessage(errMessage);
                            return of(setErrorMessage({ message: message }));
                        })
                    );
            })
        );
    });

    autoLogin$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(autoLogin),
            mergeMap((action) => {
                console.log(`In auth effects ${action.type}`);
                const user: User | null = this.authService.getUserFromLocalStorage();
                return of(loginSuccess({user: user, redirect: false}));
            })
        );
    });

    logout$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(autoLogout),
            map((action) => {
                console.log(`In auth effects ${action.type}`);
                this.authService.logout();
                this.router.navigate(['/auth']);
            })
        )
    }, {dispatch: false});

}