import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { getPostById } from '../state/posts.selector';
import { AppState } from '../../store/app.state';
import { Post } from '../../models/posts.model';
import { editPost } from '../state/posts.actions';


@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent implements OnInit, OnDestroy {
  post: Post | undefined;
  postForm: FormGroup;
  postSubscription: Subscription;

  constructor(private route: ActivatedRoute,
    private store: Store<AppState>,
    private router: Router
  ) {
    this.postForm = new FormGroup({});
    this.postSubscription = this.route.paramMap.subscribe(params => {
      const param = params.get('id');
      const id = (param) ? parseInt(param) : NaN;
      this.store.select(getPostById({ id })).subscribe(data => {
        this.post = data;
        console.log(this.post);
        this.createForm();
      });
    });
  }

  ngOnInit(): void {
  }

  createForm(): void {
    this.postForm.setControl('title', new FormControl(this.post?.title, [Validators.required, Validators.minLength(6)]));
    this.postForm.setControl('description', new FormControl(this.post?.description, [Validators.required, Validators.minLength(10)]));
  }

  showTitleErrors(): string | undefined {
    const titleForm = this.postForm.get('title');
    if (titleForm?.errors?.['required']) {
      return 'Title is required.';
    }
    if (titleForm?.errors?.['minlength']) {
      return 'Title should be minimum of 6 characters long.';
    }
    return;
  }

  showDescriptionErrors(): string | undefined {
    const descriptionForm = this.postForm.get('description');
    if (descriptionForm?.errors?.['required']) {
      return 'Description is required';
    }
    if (descriptionForm?.errors?.['minlength']) {
      return 'Description should be of minimum 10 characters long.';
    }
    return;
  }

  onUpdatePost(): void {
    if (this.post && this.postForm.valid) {
      const postdata = this.postForm.value;
      const updatedPost: Post = {
        id: this.post.id,
        title: postdata.title,
        description: postdata.description
      };
      this.store.dispatch(editPost({ post: updatedPost }));
    }
    this.router.navigate(['posts']);
  }

  ngOnDestroy(): void {
    if (this.postSubscription) {
      this.postSubscription.unsubscribe();
    }
  }
}
