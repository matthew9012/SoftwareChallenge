import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registrationCredentials: RegistrationCredentials = {
    username: '',
    password1: '',
    password2: ''
  };

  constructor() { }

  ngOnInit() {
  }

  registerUser() {
    console.log(this.registrationCredentials);
  }

}

class RegistrationCredentials {
  username: string;
  password1: string;
  password2: string;
}
