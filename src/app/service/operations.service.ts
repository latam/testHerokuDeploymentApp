import {Injectable} from "@angular/core";
import {Http, RequestOptions, Response, Headers} from "@angular/http";
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import {AuthenticationService} from "./authentication.service";
import {OperationData} from "../operations/operations.model";
import {CompanyService} from "./company.service";
import {ErrorResponse} from "../common/error.response";
import {BaseApiPath} from "../globals";

@Injectable()
export class OperationsService {
  private companyUrl = BaseApiPath + 'operation';


  constructor(private http: Http,
              private authenticationService: AuthenticationService,
              private companyService: CompanyService) {
  }

  getOperations(): Observable<OperationData[]> {
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'authorization': this.authenticationService.getToken()
    });
    let options = new RequestOptions({headers: headers});

    return this.http.get(this.companyUrl, options)
      .map((res: Response) => this.mapOperations(res))
      .catch((error: Response) => {
          let parsedError = this.mapError(error.json());
          return Observable.throw(parsedError);
      });
  }

  getFilteredOperations(fromDate: string, toDate: string): Observable<OperationData[]> {
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'authorization': this.authenticationService.getToken()
    });
    let options = new RequestOptions({headers: headers});
    let url = this.companyUrl + "?from=" + fromDate + "&to=" + toDate;
    return this.http.get(url, options)
      .map((res: Response) => this.mapOperations(res))
      .catch((error: Response) => {
        let parsedError = this.mapError(error.json());
        return Observable.throw(parsedError);
      });
  }

  saveOperation(operation: OperationData) {
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'authorization': this.authenticationService.getToken()
    });
    let options = new RequestOptions({headers: headers});
    return this.http.post(this.companyUrl, JSON.stringify(operation), options)
      .map((res: Response) => this.mapOperation(res.json()))
      .catch((error: Response) => Observable.throw(this.mapError(error)));
  }

  toOperation(r: any): OperationData {
    console.log("JSON: " + r);
    let operation = <OperationData>({
      id: r.id,
      date: r.date,
      docNumber: r.docNumber,
      contractor: r.contractor,
      description: r.description,
      purchase: r.purchase,
      type: r.type,
      kpirColumn: r.kpirColumn,
      vatBid: r.vatBid,
      nettoValue: r.nettoValue
    });
    console.log('Parsed operation:', operation);
    return operation;
  }

  mapOperation(response:Response): OperationData{
    return this.toOperation(response.json());
  }

  mapOperations(response:Response): OperationData[]{
    return response.json().map(this.toOperation);
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
