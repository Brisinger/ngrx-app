import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { AppState } from '../../store/app.state';
import { getPosts } from '../state/posts.selector';
import { deletePost, loadPosts} from '../state/posts.actions';

import { Post } from '../../models/posts.model';


@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.css']
})
export class PostsListComponent implements OnInit {
  posts: Observable<Post[] | null>;

  constructor(private store: Store<AppState>) {
    this.posts = this.store.select(getPosts);
    this.store.dispatch(loadPosts());
  }

  ngOnInit(): void {
  }

  onDeletePost(id: number): void {
    if (confirm("Are you sure you want to delete?")) {
      console.log(`Delete the post with id: ${id}`);
      this.store.dispatch(deletePost({id}));
    }
  }

}