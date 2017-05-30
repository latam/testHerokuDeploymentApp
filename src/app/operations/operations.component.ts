import {Component} from '@angular/core';
import 'rxjs/add/operator/toPromise';
import {OperationData} from "./operations.model";
import {OperationsService} from "../service/operations.service";
import {DatePipe} from "@angular/common";
import {CompanyData} from "../account/company/company.data";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {OperationModalComponent} from "./operation.modal.component";
import {ErrorResponse} from "../common/error.response";
import {AuthenticationService} from "../service/authentication.service";
import {Router} from "@angular/router";
import {DateFilterCriteria} from "../common/filter/date.filter.criteria";

@Component({
  selector: 'operations-view',
  templateUrl: './operations.component.html',
  styleUrls: ['./operations.component.css'],
})
export class OperationsComponent {
  operationsData: OperationData[];
  error: ErrorResponse;
  dateFilterCriteria: DateFilterCriteria;

  constructor(
    private operationsService: OperationsService,
    private authenticationService: AuthenticationService,
    private modalService: NgbModal,
    private router: Router,
    private datePipe: DatePipe
  ) { }

  onDateFilterCriteriaChanged(dateFilterCriteria: DateFilterCriteria) {
    this.dateFilterCriteria = dateFilterCriteria;
    this.loadFilteredOperations();
  }

  openOperationEditionModal(type: string, purchase: boolean) {
    const modalRef = this.modalService.open(OperationModalComponent, {size: "lg"});
    modalRef.componentInstance.title = (purchase ? "Rozchód" : "Przychód") + " - " + type;
    modalRef.componentInstance.operation = new OperationData(
      null,
      this.datePipe.transform(new Date(), 'yyyy-MM-dd'),
      '',
      new CompanyData(0, '', '', '', '', '', '', false),
      '',
      purchase,
      type,
      purchase?13:8,
      23,
      0.0);
    modalRef.result
      .then(() => {
        this.loadFilteredOperations();
      });
  }

  loadFilteredOperations() {
    this.operationsService.getFilteredOperations(this.dateFilterCriteria.fromDate, this.dateFilterCriteria.toDate)
      .subscribe(
        operationsData => {
          this.operationsData = operationsData;
        },
        error => {
          this.error = error;
          if(error.errorCode == 11) {
            this.authenticationService.logout();
            this.router.navigate(['login']);
          }
          console.log(this.error);
        } );
  }

  deleteOperation(operationId: number) {
    this.operationsService.deleteOperation(operationId)
      .subscribe(
        () => {
          this.loadFilteredOperations();
        },
        error => {
          this.loadFilteredOperations();
          this.error = error;
          if(error.errorCode == 11) {
            this.authenticationService.logout();
            this.router.navigate(['login']);
          }
          console.log(this.error);
        }
      );
  }
}

