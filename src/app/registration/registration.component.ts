import { Component } from '@angular/core';
import {RegistrationData} from "./registration.data";

import {AuthenticationService} from "../../service/authentication.service";
import {Router} from "@angular/router";

@Component({
  selector: 'registration-form',
  templateUrl: './registration.component.html',
})
export class RegistrationComponent {
  registrationData = new RegistrationData('', '', '', '', '');
  error = '';
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) { }

  onSubmit() {
    this.authenticationService.register(this.registrationData).subscribe(result => {
      if(result == '') {
        this.router.navigate(['']);
      }
      else {
        this.error = 'Registration data is incorrect.';
      }
    });
  }
}
