import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {AuthenticationService} from "../service/authentication.service";

@Component({
  selector: 'home-view',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit() {
    if(!this.authenticationService.isLoggedIn()) {
      this.router.navigate(["login"]);
    }
  }
}
