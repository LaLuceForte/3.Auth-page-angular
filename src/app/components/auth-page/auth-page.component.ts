import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { UserLogin } from 'src/app/models/user-login.model';

import { createPasswordStrengthValidator } from './custom-validators';
import { createLoginPasswordCheck } from './custom-validators';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.scss']
})
export class AuthPageComponent implements OnInit {

  hide: boolean = true; //to show or hide password 
  signInCard: boolean = true; //to show signIn card or signOut card
  isClicked: boolean = false; //to check whether user changed signIn and signOut cards or not

  signUpMessage: string; //to notify user whether theirs password and login are relevant
  signInMessage: string; //to notify user whether theirs password and login are correct

  users: UserLogin[] = [];

  constructor(private httpClient: HttpClient, private router: Router) { }

  form: FormGroup = new FormGroup({
    login: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      createLoginPasswordCheck() //white spaces detection

    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      createLoginPasswordCheck(),
      createPasswordStrengthValidator() //to check if the password is suitable
    ]),
  });

  get password() {
    return this.form.get('password');
  }

  get login() {
    return this.form.get('login');
  }

  ngOnInit() {
    if (localStorage.getItem('users') !== null) {
      this.users = JSON.parse(localStorage.getItem('users')!);
    }
  }

  checkUniqueLoginPassword() { //check that  password and login are both unique when sign up
    return this.users.find(item => item.login === this.form.value.login || item.password === this.form.value.password);
  }
  checkLogin() { //check password and login when sign in
    return this.users.find(item => item.login === this.form.value.login && item.password === this.form.value.password);
  }

  signIn() {
    if (this.checkLogin() !== undefined) {
      localStorage.setItem('signedIn', 'true');
      this.router.navigate(['content']);
    } else {
      this.signInMessage = 'incorrect login or password'
      localStorage.setItem('signedIn', 'false')
    }
  }

  signUp() {
    if (this.checkUniqueLoginPassword() !== undefined) {
      this.signUpMessage = 'the account with this password or login already exists';
    } else {
      if (this.form.valid) {
        this.users.push(this.form.value);
        localStorage.setItem('users', JSON.stringify(this.users));
        this.signUpMessage = 'You have been registered successefully!';
      } else if (this.login?.errors?.['required']) {
        this.signUpMessage = 'login is required';
      } else if (this.login?.errors?.['minlength']) {
        this.signUpMessage = 'login length is 5 minimum';
      } else if (this.login?.errors?.['cannotContainSpace']) {
        this.signUpMessage = 'delete all spaces from login, please'
      }
      else if (this.password?.errors?.['cannotContainSpace']) {
        this.signUpMessage = 'delete all spaces from password, please'
      } else if (this.password?.errors?.['required']) {
        this.signUpMessage = 'password field is empty!'
      } else if (this.password?.errors?.['minlength']) {
        this.signUpMessage = 'password length is 8 minimum'
      } else if (this.password?.errors?.['passwordStrength']) {
        this.signUpMessage = ' Your password must have lower case, upper case and numeric characters.'
      }
    }
  }

  resetForm() {
    this.form.reset();
    this.isClicked = true;
    this.signInMessage = '';
    this.signUpMessage = '';
  }

}
