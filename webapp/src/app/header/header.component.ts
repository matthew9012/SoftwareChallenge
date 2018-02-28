import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from '../../reducers';
import { Observable } from 'rxjs/Observable';
import { CustomUserApi } from '../../services';
import { Router } from '@angular/router';
import { AuthState } from '../../reducers/auth';
import { LoginError } from '../../actions/auth';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers: [CustomUserApi]
})
export class HeaderComponent implements OnInit {

  authState: Observable<AuthState>;
  sessionId: String;

  constructor(
    private store: Store<State>,
    private userApi: CustomUserApi,
    private router: Router
  ) { }

  ngOnInit() {
    this.authState = this.store.select(state => state.auth);
    this.store.subscribe(state => this.sessionId = state.auth.sessionId);
  }

  private logOut() {
    if (this.sessionId) {
      this.handleSuccess();
    }
    this.userApi.customUserLogout({search: {access_token: this.sessionId}}).subscribe(
      success => this.handleSuccess(),
      error => console.log(error)
    );
  }

  private handleSuccess() {
    this.store.dispatch(new LoginError({}));
    this.router.navigate(['/']);
  }

}
