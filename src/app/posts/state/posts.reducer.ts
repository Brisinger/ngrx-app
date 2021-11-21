import { Action, createReducer, on } from "@ngrx/store";

import { PostsState } from "./posts.state.interface";
import { Post } from "src/app/models/posts.model";
import { initialState } from "./posts.state";
import { addPostSuccess, editPost, editPostSuccess, deletePost, loadPostsSuccess } from "./posts.actions";


const _postsReducer = createReducer(
    initialState,
    on(addPostSuccess, (state, action) => {
        return {
            ...state,
            posts: [...state.posts, action.post],
        };
    }),
    on(editPostSuccess, (state, action) => {
        const updatedPost = state.posts.map(post => {
            return action.post.id === post.id ? action.post : post;
        });
        console.log(updatedPost);
        return {
            ...state,
            posts:updatedPost
        };
    }),
    on(deletePost, (state, { id }) => {
        const updatedPost: Post[] = state.posts.filter(post => post.id !== id);
        return {
            ...state,
            posts: updatedPost
        };
    }),
    on(loadPostsSuccess, (state, action) => {
        return {
            ...state,
            posts: action.posts
        };
    }),
);

export function postsReducer(state: PostsState | undefined, action: Action){
    return _postsReducer(state, action);
}