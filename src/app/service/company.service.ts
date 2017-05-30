import {Injectable} from "@angular/core";
import {Http, RequestOptions, Response, Headers} from "@angular/http";
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import {CompanyData} from "../account/company/company.data";
import {AuthenticationService} from "./authentication.service";
import {ErrorResponse} from "../common/error.response";
import {BaseApiPath} from "../globals";

@Injectable()
export class CompanyService {
  private companyUrl = BaseApiPath + 'company';
  private contractorsUrl = this.companyUrl + '/contractors';


  constructor(private http: Http,
              private authenticationService: AuthenticationService) {
  }

  userCompany(): Observable<CompanyData> {
    let headers = new Headers({
      'Content-Type': 'application/json',
      'authorization': this.authenticationService.getToken()
    });
    let options = new RequestOptions({headers: headers});

    return this.http.get(this.companyUrl, options)
      .map((res: Response) => this.mapCompany(res))
      .catch((error: any) => Observable.throw(this.mapError(error)));
  }

  getContractors(): Observable<CompanyData[]> {
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'authorization': this.authenticationService.getToken()
    });
    let options = new RequestOptions({headers: headers});

    return this.http.get(this.contractorsUrl, options)
      .map((res: Response) => this.mapCompanies(res))
      .catch((error: any) => Observable.throw(this.mapError(error)));
  }

  updateCompany(company: CompanyData) {
    let headers = new Headers({
      'Content-Type': 'application/json',
      'authorization': this.authenticationService.getToken()
    });
    let options = new RequestOptions({headers: headers});
    return this.http.put(this.companyUrl, JSON.stringify(company), options)
      .catch((error: any) => Observable.throw(this.mapError(error)));
  }

  createContractor(company: CompanyData) {
    let headers = new Headers({
      'Content-Type': 'application/json',
      'authorization': this.authenticationService.getToken()
    });
    let options = new RequestOptions({headers: headers});
    return this.http.post(this.contractorsUrl, JSON.stringify(company), options)
      .catch((error: any) => Observable.throw(this.mapError(error)));
  }

  deleteContractor(contractorId: number) {
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'authorization': this.authenticationService.getToken()
    });
    let options = new RequestOptions({headers: headers});
    return this.http.delete(this.contractorsUrl + '/' + contractorId, options)
      .catch((error: Response) => Observable.throw(this.mapError(error)));
  }

  mapCompany(response: Response): CompanyData {
    return this.toCompany(response.json());
  }

  mapCompanies(response: Response): CompanyData[] {
    return response.json().map(this.toCompany);
  }

  toCompany(r: any): CompanyData {
    console.log("JSON: " + r);
    let company = <CompanyData>({
      id: r.id,
      name: r.name,
      city: r.city,
      postalCode: r.postalCode,
      street: r.street,
      nip: r.nip,
      regon: r.regon,
      contractor: r.contractor
    });
    console.log('Parsed company:', company);
    return company;
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
}
