import { Component, OnInit } from '@angular/core';
import { CustomUserApi, CustomUser } from '../../services';
import { Store } from '@ngrx/store';
import { State } from '../../reducers';
import { Router } from '@angular/router';
import { RequestOptions, Headers } from '@angular/http';

@Component({
  selector: 'app-set-token',
  templateUrl: './set-token.component.html',
  styleUrls: ['./set-token.component.css'],
  providers: [CustomUserApi]
})
export class SetTokenComponent implements OnInit {

  userId: String;
  accessToken: String;
  apiTokenInput: String;

  constructor(
    private userApi: CustomUserApi,
    private store: Store<State>,
    private router: Router
  ) { }

  ngOnInit() {
    this.store.select(state => state.auth).subscribe( state =>
      this.userId = state.userId
    );
    this.store.select(state => state.auth).subscribe( state =>
      this.accessToken = state.sessionId
    );
  }

  setToken() {
    const user: CustomUser = {
      boozeApiKey: this.apiTokenInput.toString(),
      id: this.userId.toString()
    };
    this.userApi.customUserPatchOrCreateWithHttpInfo(this.accessToken.toString(), user).subscribe(
      success => this.handleSuccess(success),
      error => console.log(error)
    );
  }

  private handleSuccess(response) {
    console.log(response);
    this.router.navigate(['/search']);
  }
}
