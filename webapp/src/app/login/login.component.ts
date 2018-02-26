import { Component, OnInit } from '@angular/core';
import { State } from '../../reducers';
import { Store, createSelector } from '@ngrx/store';
import { AuthState } from '../../reducers/auth';
import { LoginSuccess, LoginError } from '../../actions/auth';
import { Observable } from 'rxjs/Observable';
import { CustomUserApi } from '../../services';
import { Router } from '@angular/router';
import { ResetSearch } from '../../actions/search';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [CustomUserApi]
})
export class LoginComponent implements OnInit {

  loginCredentials: LoginCredentials = {
    username: '',
    password: ''
  };

  authState: Observable<AuthState>;

  constructor(
    private store: Store<State>,
    private userApi: CustomUserApi,
    private router: Router
  ) { }

  ngOnInit() {
  }

  login() {

    this.userApi.customUserLogin(this.loginCredentials)
            .subscribe(response => this.handleSuccess(response),
            response => this.handleError(response));
  }

  private handleSuccess(response: any) {
    console.log(response);
    this.store.dispatch(new LoginSuccess(response));
    this.store.dispatch(new ResetSearch({}));
    if (response.hasApiToken) {
      this.router.navigate(['/search']);
    } else {
      this.router.navigate(['/setApiToken']);
    }
  }

  private handleError(response: any) {
    console.log(response);
    this.store.dispatch(new LoginError(response));
  }
}
class LoginCredentials {
  username: string;
  password: string;
}
