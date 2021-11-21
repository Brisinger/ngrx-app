import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PostsState } from './posts.state.interface';


export const POST_STATE_NAME = 'posts';

const getPostsState = createFeatureSelector<PostsState>(POST_STATE_NAME);

export const getPosts = createSelector(getPostsState, (state) => {
    return state.posts;
});

export const getPostById = (props: { id: number }) =>
    createSelector(getPosts, (posts) => {
        return posts?.find(post => post.id === props.id);
    });