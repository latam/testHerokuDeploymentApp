import {Component, OnInit} from '@angular/core';
import { LoginData } from "./login.data";

import 'rxjs/add/operator/toPromise';
import {AuthenticationService} from "../../service/authentication.service";
import {Router} from "@angular/router";
import {ErrorResponse} from "../../common/error.response";

@Component({
  selector: 'login-form',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit{
  loginData = new LoginData('', '');
  error: ErrorResponse;

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) { }

  ngOnInit() {
    if(this.authenticationService.isLoggedIn()) {
      this.router.navigate(['']);
    }
  }

  onSubmit() {
    this.authenticationService.login(this.loginData).subscribe(result => {
      if(result === true) {
        this.router.navigate(['']);
      }
    },
    error => {
      this.error = error;
      console.log(this.error);
    });
  }

  registerAccount() {
    this.router.navigate(['registration']);
  }
}
