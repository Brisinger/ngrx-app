import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { Store } from '@ngrx/store';

import { AppState } from '../../store/app.state';
import { signUpStart } from '../../auth/state/auth.actions';
import { setLoadingSpinner } from '../../store/shared/shared.actions';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signUpForm: FormGroup;

  constructor(private store: Store<AppState>) {
    this.signUpForm = new FormGroup({});
  }

  ngOnInit(): void {
    this.signUpForm.setControl('email', new FormControl('', [Validators.required, Validators.email]));
    this.signUpForm.setControl('password', new FormControl('', [Validators.required]));
  }

  onSignUpSubmit(): void {
    if (this.signUpForm.valid) {
      console.log(this.signUpForm.value);
      const email: string = this.signUpForm.value.email;
      const password: string = this.signUpForm.value.password;
      this.store.dispatch(setLoadingSpinner({status: true}));
      this.store.dispatch(signUpStart({email, password}));
    }
    return;
  }

  validateEmail(): string | undefined {
    const emailForm: AbstractControl | null = this.signUpForm.get('email');
    if(emailForm?.errors?.['required']) {
      return 'Email is required.';
    }
    if(emailForm?.errors?.['email']) {
      return 'Invalid Email.'
    }
    return;
  }

  validatePassword(): string | undefined {
    const passwordForm: AbstractControl | null = this.signUpForm.get('password');
    if(passwordForm?.errors?.['required']) {
      return 'Password is required.'
    }
    return;
  }

}
