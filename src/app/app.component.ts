import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from './store/app.state';
import { getErrorMessage, getLoading } from './store/shared/shared.selector';
import { autoLogin } from './auth/state/auth.actions';
import { setLoadingSpinner } from './store/shared/shared.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'ngrx-app';
  showLoading: Observable<Boolean>;
  showErrorMessage: Observable<string>;

  constructor( private store: Store<AppState> ) {
    this.showLoading = this.store.select(getLoading);
    this.showErrorMessage = this.store.select(getErrorMessage);
  }

  ngOnInit(): void {
    this.store.dispatch(autoLogin())
  }
}
