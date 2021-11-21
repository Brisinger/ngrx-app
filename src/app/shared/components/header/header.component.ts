import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/app.state';
import { getAuthenticated } from '../../../auth/state/auth.selector';
import { autoLogout } from '../../../auth/state/auth.actions';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isAuthenticated: Observable<boolean>;

  constructor( private store: Store<AppState> ) { 
    this.isAuthenticated = this.store.select(getAuthenticated)
  }

  ngOnInit(): void {
  }

  onLogout(event:Event): void {
    event.preventDefault();
    this.store.dispatch(autoLogout());
  }

}
