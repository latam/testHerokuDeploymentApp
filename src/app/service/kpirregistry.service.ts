import {Injectable} from "@angular/core";
import {Http, RequestOptions, Response, Headers, ResponseContentType} from "@angular/http";
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import {AuthenticationService} from "./authentication.service";
import {KpirRegistryData} from "../kpirregistry/kpirregistry.model";
import {ErrorResponse} from "../common/error.response";
import {BaseApiPath} from "../globals";

@Injectable()
export class KpirRegistryService {
  private registryUrl = BaseApiPath + 'kpirRegistry';

  constructor(private http: Http,
              private authenticationService: AuthenticationService,
              ) {
  }

  getRegistryEntries(month: number, year: number): Observable<KpirRegistryData[]> {
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'authorization': this.authenticationService.getToken()
    });
    let options = new RequestOptions({headers: headers});
    const url = `${this.registryUrl}/${month}/${year}`;

    return this.http.get(url, options)
      .map((res: Response) => this.mapEntries(res))
      .catch((error: any) => Observable.throw(this.mapError(error)));
  }

  toEntry(r: any): KpirRegistryData {
    console.log("JSON: " + r);
    let entry = <KpirRegistryData>({
      position: r.position,
      date: r.date,
      docNumber: r.docNumber,
      contractor: r.contractor,
      description: r.description,
      revProductServices: r.revProductServices,
      revOther: r.revOther,
      revCombined: r.revCombined,
      purchaseGoodsMaterials: r.purchaseGoodsMaterials,
      insuranceCost: r.insuranceCost,
      expPayment: r.expPayment,
      expOther: r.expOther,
      expCombined: r.expCombined,
      points: r.points
    });
    console.log('Parsed VAT registry entry:', entry);
    return entry;
  }

  mapEntry(response:Response): KpirRegistryData {
    return this.toEntry(response.json());
  }

  mapEntries(response:Response): KpirRegistryData[]{
    return response.json().map(this.toEntry);
  }

  getReport(year: number): any {
    let headers = new Headers({
      'authorization': this.authenticationService.getToken()
    });
    let options = new RequestOptions({headers: headers, responseType: ResponseContentType.Blob});
    const url = `${this.registryUrl}/report/${year}`;

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
