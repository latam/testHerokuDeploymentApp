import {Injectable} from "@angular/core";
import {Http, RequestOptions, Response, Headers, ResponseContentType} from "@angular/http";
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import {AuthenticationService} from "./authentication.service";
import {CompanyService} from "./company.service";
import {VatRegistryData} from "../vatregistry/vatregistry.model";
import {ErrorResponse} from "../common/error.response";
import {BaseApiPath} from "../globals";

@Injectable()
export class VatRegistryService {
  private registryUrl = BaseApiPath + 'vatRegistry';

  constructor(private http: Http,
              private authenticationService: AuthenticationService) {
  }

  getRegistryEntries(month: number, year: number): Observable<VatRegistryData[]> {
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'authorization': this.authenticationService.getToken()
    });
    let options = new RequestOptions({headers: headers});
    const url = `${this.registryUrl}/entries/${month}/${year}`;

    return this.http.get(url, options)
      .map((res: Response) => this.mapEntries(res))
      .catch((error: any) => Observable.throw(this.mapError(error)));
  }

  toEntry(r: any): VatRegistryData {
    console.log("JSON: " + r);
    let entry = <VatRegistryData>({
      id: r.id,
      date: r.date,
      docNumber: r.docNumber,
      contractor: r.contractor,
      description: r.description,
      purchase: r.purchase,
      position: r.position,
      vatBid: r.bid,
      nettoValue: r.nettoValue,
      vatValue: r.vatValue
    });
    console.log('Parsed VAT registry entry:', entry);
    return entry;
  }

  mapEntry(response:Response): VatRegistryData {
    return this.toEntry(response.json());
  }

  mapEntries(response:Response): VatRegistryData[]{
    return response.json().map(this.toEntry);
  }

  getReport(month: number, year: number): any {
    let headers = new Headers({
      'authorization': this.authenticationService.getToken()
    });
    let options = new RequestOptions({headers: headers, responseType: ResponseContentType.Blob});
    const url = `${this.registryUrl}/report/${month}/${year}`;

    return this.http.get(url, options).map(
      (response) => {
        return new Blob([response.blob()], { type: 'application/pdf' })
      }
    )
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
