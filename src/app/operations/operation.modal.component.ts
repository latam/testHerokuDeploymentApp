import {Component, Input, OnInit} from "@angular/core";
import {NgbActiveModal, NgbDateParserFormatter} from "@ng-bootstrap/ng-bootstrap";
import {OperationsService} from "../service/operations.service";
import {CompanyService} from "../service/company.service";
import {CompanyData} from "../account/company/company.data";
import {DatePipe} from "@angular/common";
import {KPIR_EXPENSE, KPIR_REVENUE, KpirColumn, OperationData} from "./operations.model";
import {AuthenticationService} from "../service/authentication.service";
import {ErrorResponse} from "../common/error.response";

@Component({
  selector: 'operation-modal',
  templateUrl: './operation.modal.component.html',
  styleUrls: ['./operation.modal.component.css']
})
export class OperationModalComponent implements OnInit{
  @Input() operation;
  @Input() title;
  date = new Date();
  ngbDateStruct = { day: this.date.getDate(), month: this.date.getMonth()+1, year: this.date.getFullYear()};
  companiesData: CompanyData[];
  kpirColumns: KpirColumn[];

  selectedKpirColumn: KpirColumn;
  selectedContractor = new CompanyData(0, '', '', '', '', '', '', true);
  error: ErrorResponse;

  constructor(
    public activeModal: NgbActiveModal,
    private operationsService: OperationsService,
    private companyService: CompanyService,
    private authenticationService: AuthenticationService,
    private datePipe: DatePipe,
    private ngbDateParserFormatter: NgbDateParserFormatter) {}

  ngOnInit() {
    if(this.operation.purchase) {
      this.kpirColumns = KPIR_EXPENSE;
    }
    else {
      this.kpirColumns = KPIR_REVENUE;
    }

    this.selectedKpirColumn = this.kpirColumns[0];

    this.companyService.getContractors()
      .subscribe(
        companiesData => {
          this.companiesData = companiesData;
          if(this.companiesData.length > 0) {
            this.selectedContractor = this.companiesData[0];
          }
          console.log(this.companiesData);
        },
        error => {
          this.error = error;
          console.log(this.error);
          if(error.errorCode == 11) {
            this.authenticationService.logout();
          }
        });
  }

  get selectedContractorMod() {
    return this.selectedContractor;
  }

  set selectedContractorMod(value) {
    this.selectedContractor = value;
  }

  get selectedKpirColumnMod() {
    return this.selectedKpirColumn;
  }

  set selectedKpirColumnMod(value) {
    this.selectedKpirColumn = value;
  }

  onSubmit() {
    let dateToFormat = this.ngbDateParserFormatter.format(this.ngbDateStruct);
    let stringDate = this.datePipe.transform(dateToFormat, 'yyyy-MM-dd');

    this.operation.date = stringDate;
    this.operation.kpirColumn = this.selectedKpirColumn.id;
    this.operation.contractor = this.selectedContractor;
    console.log(this.operation);

    this.operationsService.saveOperation(this.operation)
      .subscribe(
        () => {
          this.activeModal.close();
        },
        error => {
          this.error = <any>error;
          console.log(error);
        } );
  }
}

