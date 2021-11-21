import { Action, createReducer, on } from "@ngrx/store";
import { AuthState, initialState } from "./auth.state";
import { loginSuccess, loginStart, signUpSuccess, autoLogout } from "./auth.actions";


const _authReducer = createReducer(
    initialState,
    on(loginStart, (state, action) => {
        console.log(action);
        return{
            ...state,
        };
    }),
    on(loginSuccess, (state, action) => {
        console.log(action);
        return {
            ...state,
            user: action.user,
        };
    }),
    on(signUpSuccess, (state, action) => {
        console.log(action);
        return {
            ...state,
            user: action.user,
        };
    }),
    on(autoLogout, (state) => {
        return {
            ...state,
            user: null,
        };
    }),
);

export function authReducer(state: AuthState | undefined, action: Action) {
    return _authReducer(state, action);
};