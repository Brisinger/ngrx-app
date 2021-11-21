import { createAction, props } from '@ngrx/store';
import { Post } from '../../models/posts.model'

const ADD_POST_ACTION = '[posts page] add post';
const ADD_POST_SUCCESS = '[posts page] add post';
const UPDATE_POST_ACTION = '[posts page] edit post';
const UPDATE_POST_SUCCESS = '[posts page] edit post success';
const DELETE_POST_ACTION = '[posts page] delete post';
const LOAD_POSTS = '[posts page] load posts';
const LOAD_POSTS_SUCCESS = '[posts page] load posts success';

export const addPost = createAction(ADD_POST_ACTION, props<{post: Post }>());
export const addPostSuccess = createAction(ADD_POST_SUCCESS, props<{post: Post}>());
export const editPost = createAction(UPDATE_POST_ACTION, props<{post: Post}>());
export const editPostSuccess = createAction(UPDATE_POST_SUCCESS, props<{post: Post}>());
export const deletePost = createAction(DELETE_POST_ACTION, props<{id: number}>());
export const loadPosts = createAction(LOAD_POSTS);
export const loadPostsSuccess = createAction(
    LOAD_POSTS_SUCCESS,
    props<{posts: Post[]}>(),
); 