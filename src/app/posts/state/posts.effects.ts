import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, map, switchMap } from 'rxjs';

import { PostsService } from '../../services/posts.service';
import { addPost, addPostSuccess, loadPosts, loadPostsSuccess, editPost, editPostSuccess } from './posts.actions';
import { Post } from '../../models/posts.model';


@Injectable({
    providedIn: 'root',
})
export class PostsEffects {
    constructor(
        private action$: Actions,
        private postsService: PostsService
    ) { }

    loadPosts$ = createEffect(() => {
        return this.action$.pipe(
            ofType(loadPosts),
            mergeMap((action) => {
                console.log(`In post effects ${action.type}`);
                return this.postsService.getPosts()
                    .pipe(
                        map((posts) => {
                            return loadPostsSuccess({ posts });
                        })
                    );
            })
        )
    });

    addPost$ = createEffect(() => {
        return this.action$.pipe(
            ofType(addPost),
            mergeMap((action) => {
                return this.postsService.addPost(action.post)
                    .pipe(
                        map((data: {name: string}) => {
                            const hash = this.postsService.hashCode(data.name);
                            const post: Post = {... action.post, id: hash};
                            return addPostSuccess({post: post});
                        })
                    );
            },)
        )
    });

    updatePost$ = createEffect(() => {
        return this.action$.pipe(
            ofType(editPost),
            switchMap((action) => {
                return this.postsService.updatePost(action.post)
                    .pipe(
                        map((data) => {
                            return editPostSuccess({post: action.post});
                        })
                    );
            })
        )
    })
}