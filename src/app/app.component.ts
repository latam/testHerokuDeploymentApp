import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthenticationService} from "./service/authentication.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  loggedIn: boolean;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit() {
    this.checkCredentials();
  }

  checkCredentials() {
    this.loggedIn = this.authenticationService.isLoggedIn();
  }

  get LoggedInMod() {
    this.checkCredentials();
    return this.loggedIn;
  }

  logout() {
    this.authenticationService.logout();
    this.loggedIn = false;
    this.router.navigate(['login']);
  }
}
