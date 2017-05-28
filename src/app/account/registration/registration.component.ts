import { Component } from '@angular/core';
import {RegistrationData} from "./registration.data";
import {CompanyData} from "../company/company.data";

import {AuthenticationService} from "../../service/authentication.service";
import {Router} from "@angular/router";
import {ErrorResponse} from "../../common/error.response";

@Component({
  selector: 'registration-form',
  templateUrl: './registration.component.html',
})
export class RegistrationComponent {
  registrationData = new RegistrationData('', '','','', '',
    new CompanyData(1, '', '', '', '', '', '', false));
  error: ErrorResponse;
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) { }

  onSubmit() {
    this.authenticationService.register(this.registrationData).subscribe(result => {
      if (result == '') {
        this.router.navigate(['']);
      }
    },
      error => {
        this.error = error;
        console.log(this.error);
    });
  }
}
