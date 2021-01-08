import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { User } from '../models/user';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit, OnDestroy {
  createUserForm: FormGroup;
  loginForm: FormGroup;
  hide: boolean;
  user: User;
  userIdSubscription: Subscription;
  logInError;
  signUpError;

  constructor(
    private userService: UserService,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.createUserForm = new FormGroup({
      userId: new FormControl(null),
      username: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required]),
    });
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required]),
    });
    this.userIdSubscription = this.authService.userId.subscribe((res) => {
      console.log('redirect ID=', res);
      if (res) {
        this.router.navigate([`/home/dashboard`]);
      }
    });
    this.authService.logInError.subscribe((e) => {
      this.logInError = e;
    });
    this.userService.signUpError.subscribe((e) => {
      this.signUpError = e;
    });
  }
  toggle(cont) {
    cont.classList.toggle('s--signup');
  }
  loginEmail() {
    this.authService.loginEmail(this.loginForm.value);
  }
  login() {
    this.authService.login();
  }
  signUp() {
    this.userService.createUser(this.createUserForm.value);
  }
  ngOnDestroy() {
    this.authService.logInError.unsubscribe();
    this.userService.signUpError.unsubscribe();
    this.userIdSubscription.unsubscribe();
  }
}
