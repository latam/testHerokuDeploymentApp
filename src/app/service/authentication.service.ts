import { Injectable }     from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import {Observable} from 'rxjs/Rx';
import {LoginData} from "../account/login/login.data";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {RegistrationData} from "../account/registration/registration.data";
import {ErrorResponse} from "../common/error.response";
import {BaseApiPath} from "../globals";

@Injectable()
export class AuthenticationService {
  private authenticationUrl = BaseApiPath + 'auth/login';
  private registrationUrl = BaseApiPath + 'auth/registration';

  constructor(private http: Http) {
  }

  login(loginData: LoginData): Observable<boolean> {
    let bodyString = JSON.stringify(loginData);
    console.log("LOGIN - login data: " + bodyString);
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});

    return this.http.post(this.authenticationUrl, loginData, options)
      .map((res: Response) => {
        let token = res.headers.get('Authorization');
        if(token == null) {
          token = res.json();
        }
        console.log("LOGIN - response: ");
        console.log(res);
        console.log("LOGIN - authorization token: " + token);
        if(token) {
          localStorage.setItem('currentUser', JSON.stringify({username: loginData.username, token: token}));
          console.log("LOGIN - logged in as: " + loginData.username);
          return true;
        }
        else {
          return false;
        }
      })
      .catch((error: any) => Observable.throw(error.json()));
  }

  register(registrationData: RegistrationData): Observable<string> {
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});

    return this.http.post(this.registrationUrl, registrationData, options)
      .map((res: Response) => {
        if(res.status == 201) {
          return '';
        }
        else {
          res.json().stringify();
        }
      })
      .catch((error: any) => Observable.throw(this.mapError(error)));
  }

  isLoggedIn(): boolean {
    var token: String = this.getToken();
    return token && token.length > 0;
  }

  getToken(): String {
    var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    var token = currentUser && currentUser.token;
    return token ? token : "";
  }

  mapError(r: any): ErrorResponse {
    let error = <ErrorResponse>({
      status: r.status,
      message: r.message,
      errorCode: r.errorCode,
      devMessage: r.devMessage
    });
    console.log("JSON: " + r);
    console.log('Parsed error:', error);
    return error;
  }

  logout(): void {
    localStorage.removeItem('currentUser');
  }

}
