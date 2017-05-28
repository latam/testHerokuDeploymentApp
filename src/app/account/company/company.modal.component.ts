import {Component, Input} from "@angular/core";
import {CompanyData} from "./company.data";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {CompanyService} from "../../service/company.service";

@Component({
  selector: 'company-modal',
  templateUrl: './company.modal.component.html',
})
export class CompanyModalComponent {
  @Input() companyData: CompanyData;
  @Input() isNewCompany: boolean;
  error: any;
  constructor(
    public activeModal: NgbActiveModal,
    public companyService: CompanyService
    ) {}

  onSubmit() {
    if(this.isNewCompany == true) {
      this.createCompany();
    }
    else {
      this.updateCompany();
    }
  }

  updateCompany() {
    this.companyService.updateCompany(this.companyData)
      .subscribe(
        companyData => {
          this.companyData = companyData;
          this.activeModal.close();
        },
        error => {
          this.error = <any>error;
          console.log(error);
          this.activeModal.close();
        }
      );
  }

  createCompany() {
    this.companyService.createContractor(this.companyData)
      .subscribe(
        companyData => {
          this.companyData = companyData;
          this.activeModal.close();
        },
        error => {
          this.error = <any>error;
          console.log(error);
          this.activeModal.close();
        }
      );
  }
}
