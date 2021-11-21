import { Action, createReducer, on } from "@ngrx/store";
import { initialState, SharedState } from "./shared.state";
import { setLoadingSpinner, setErrorMessage } from "./shared.actions";


const _sharedReducer = createReducer(
    initialState,
    on(setLoadingSpinner, (state, action) => {
        console.log(action);
        return {
            ...state,
            showLoading: action.status,
        };
    }),
    on(setErrorMessage, (state, action) => {
        console.log(action);
        return {
            ...state,
            errorMessage: action.message,
        };
    }),
);
export function sharedReducer(state: SharedState | undefined, action: Action) {
    console.log(`Executing sharedReducer for ${action.type}`);
    return _sharedReducer(state, action);
}