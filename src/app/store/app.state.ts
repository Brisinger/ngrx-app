import { CounterState } from "../counter/state/CounterState";
import { PostsState } from "../posts/state/posts.state.interface";
import { SharedState } from "../store/shared/shared.state";
import { AuthState } from "../auth/state/auth.state";
import { SHARED_STATE_NAME } from "../store/shared/shared.selector";
import { AUTH_STATE_NAME } from "../auth/state/auth.selector";


export interface AppState {
    [SHARED_STATE_NAME]: SharedState;
    [AUTH_STATE_NAME]: AuthState;
}