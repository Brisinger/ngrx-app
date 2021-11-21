import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';

import { AppState } from '../../store/app.state';
import { loginStart } from '../state/auth.actions';
import { setLoadingSpinner } from '../../store/shared/shared.actions';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private store: Store<AppState>) {
    this.loginForm = new FormGroup({});
  }

  ngOnInit(): void {
    this.loginForm.setControl('email', new FormControl('', [Validators.required, Validators.email]));
    this.loginForm.setControl('password', new FormControl('', [Validators.required]));
  }

  onLoginSubmit(): void {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
      const email = this.loginForm.value.email;
      const password = this.loginForm.value.password;
      this.store.dispatch(setLoadingSpinner({ status: true }));
      this.store.dispatch(loginStart({ email: email, password: password }));
    }
    return;
  }

}
