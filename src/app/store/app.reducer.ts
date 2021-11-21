import { counterReducer } from "../counter/state/counter.reducer";
import { postsReducer } from "../posts/state/posts.reducer";
import { authReducer } from "../auth/state/auth.reducer";
import { sharedReducer } from "../store/shared/shared.reducer";
import { AUTH_STATE_NAME } from "../auth/state/auth.selector";
import { SHARED_STATE_NAME } from "../store/shared/shared.selector";


export const appReducer = {
    [SHARED_STATE_NAME]: sharedReducer,
    [AUTH_STATE_NAME]: authReducer,
}