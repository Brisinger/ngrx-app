import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";

import { environment } from "../../environments/environment";
import { User } from "../models/user.model";
import { AppState} from "../store/app.state";
import { AuthResponseData } from "../models/authResponseData.model";
import { autoLogout } from "../auth/state/auth.actions";


@Injectable({
    providedIn: "root",
})
export class AuthService {
    timeoutInterval: any;
    constructor(private http: HttpClient, private store: Store<AppState>) {

    }

    signUp(email: string, password: string): Observable<AuthResponseData> {
        return this.http
            .post<AuthResponseData>(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.FIREBASE_API_KEY}`,
                { email, password, returnSecureToken: true });
    }

    login(email: string, password: string): Observable<AuthResponseData> {
        return this.http
            .post<AuthResponseData>(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.FIREBASE_API_KEY}`,
                { email, password, returnSecureToken: true });
    }

    logout(): void {
        localStorage.removeItem('userData');
        if(this.timeoutInterval) {
            clearTimeout(this.timeoutInterval);
            this.timeoutInterval = null;
        }
    }

    formatData(data: AuthResponseData): User {
        const expirationDate = new Date(new Date().getTime() + +data.expiresIn * 1000);
        const user: User = new User(
            data.email,
            data.idToken,
            data.localId,
            expirationDate,
        );
        return user;
    }

    formatErrorMessage(msg: string): string {
        switch (msg) {
            case "EMAIL_NOT_FOUND":
                return "Email not found.";
            case "INVALID_PASSWORD":
                return "Invalid password entered by user.";
            case "USER_DISABLED":
                return "The user account has been disabled by an administrator.";
            case "EMAIL_EXISTS":
                return "The email address is already in use by another account.";
            case "OPERATION_NOT_ALLOWED":
                return "Password sign-in is disabled for this project.";
            case "TOO_MANY_ATTEMPTS_TRY_LATER":
                return "We have blocked all requests from this device due to unusual activity. Try again later.";
            default:
                return "Unknown error occured. Please try again.";
        }
    }

    setUserInLocalStorage(userAuthData: User): void {
        localStorage.setItem('userData', JSON.stringify(userAuthData));
        this.runTimerInterval(userAuthData);
    }

    runTimerInterval(userAuthData: User) {
        const todaysDate = new Date();
        const currentTime = todaysDate.getTime();
        const expiryTime = userAuthData.expireDate.getTime();
        const timeInterval = expiryTime - currentTime;
        this.timeoutInterval = setTimeout(() => {
            //Logout functionality or get the refresh token.
            this.store.dispatch(autoLogout());
        }, timeInterval);
    }

    getUserFromLocalStorage(): User | null {
        const userData: string | null = localStorage.getItem('userData');
        let user: User | null = null;
        if(userData) {
            const data = JSON.parse(userData);
            const expirationDate: Date = new Date(data.expirationDate);
            user = new User(
                data.email,
                data.token,
                data.localId,
                expirationDate
            );
            this.runTimerInterval(user);
        }
        return user;
    }
}