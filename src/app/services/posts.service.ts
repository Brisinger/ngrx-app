import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AppState } from '../store/app.state';
import { loadPosts } from '../posts/state/posts.actions';
import { Post } from '../models/posts.model';


@Injectable({
    providedIn: 'root',
})
export class PostsService {
    baseUrl: string;
    constructor(private http: HttpClient, private store: Store<AppState>) {
        this.baseUrl = `https://ngrx-angular13-default-rtdb.asia-southeast1.firebasedatabase.app/`;
    }

    hashCode = function (s: string) {
        var hash = 0, i, chr;
        if (s.length === 0) return hash;
        for (i = 0; i < s.length; i++) {
            chr = s.charCodeAt(i);
            hash = ((hash << 5) - hash) + chr;
            hash |= 0; // Convert to 32bit integer
        }
        return hash;
    };

    getPosts(): Observable<Post[]> {
        const getPostsUrl: string = `${this.baseUrl}posts.json`;
        return this.http.get<Post[]>(getPostsUrl)
            .pipe(
                map((data: {[key: string]: any}) => {
                    const posts: Post[] = [];
                    for (let key in data) {
                        const hash: number = this.hashCode(key);
                        posts.push({...data[key], id: hash});
                    }
                    return posts;
                })
            );
    }

    addPost(post: Post): Observable<{name: string}> {
        const postUrl: string = `${this.baseUrl}posts.json`; 
        return this.http.post<{name: string}>(postUrl, post);
    }

    updatePost(post: Post) {
        const postUrl: string = `${this.baseUrl}posts.json`;
        const postData = {
            [post.id]: {
                title: post.title,
                description: post.description,
            }
        }; 
        return this.http.patch(postUrl, postData); 
    }

}

