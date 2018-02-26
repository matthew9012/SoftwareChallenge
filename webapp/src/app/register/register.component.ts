import { Component, OnInit } from '@angular/core';
import { CustomUserApi } from '../../services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [CustomUserApi]
})
export class RegisterComponent implements OnInit {

  registrationCredentials: RegistrationCredentials = {
    username: '',
    password1: '',
    password2: ''
  };

  constructor(
    private userApi: CustomUserApi,
    private router: Router
  ) { }

  ngOnInit() {
  }

  registerUser() {
    if (this.registrationCredentials.password1 !== this.registrationCredentials.password2) {
      console.log('passwords are not the same');
      return;
    }
    const req = {
      email: this.registrationCredentials.username,
      username: this.registrationCredentials.username,
      password: this.registrationCredentials.password1,
      emailVerified: true,
      boozeApiKey: ''
    };

    this.userApi.customUserCreate(req)
            .subscribe(response => this.handleSuccess(response),
            response => this.handleError(response));
  }

  private handleSuccess(response: any) {
    console.log(response);
    this.router.navigate(['/login']);
  }
  private handleError(response: any) {
    console.log(response);
  }
}

class RegistrationCredentials {
  username: string;
  password1: string;
  password2: string;
}
