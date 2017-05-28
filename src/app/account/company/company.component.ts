import {Component, OnInit} from "@angular/core";
import {CompanyData} from "./company.data";
import {CompanyService} from "../../service/company.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {CompanyModalComponent} from "./company.modal.component";

@Component({
  selector: 'company-form',
  templateUrl: './company.component.html',
})
export class CompanyComponent implements OnInit{
  companyData = new CompanyData(1, '', '', '', '', '', '', false);
  contractorsData: CompanyData[];
  error: any;

  constructor(
    private companyService: CompanyService,
    private modalService: NgbModal
  ) { }

  ngOnInit() {
    this.refreshComponent();
  }

  openModal(companyToEdit: CompanyData) {
    let isNewCompany = false;
    if(companyToEdit == null) {
      isNewCompany = true;
      companyToEdit = new CompanyData(0, '', '', '', '', '', '', false);
    }
    const modalRef = this.modalService.open(CompanyModalComponent, {size: "lg"});
    modalRef.componentInstance.companyData = companyToEdit;
    modalRef.componentInstance.isNewCompany = isNewCompany;
    modalRef.result
      .then(() => {
        this.refreshComponent();
      });
  }

  refreshComponent() {
    this.companyService.userCompany()
      .subscribe(
        companyData => {
          this.companyData = companyData;
        },
        error => {
          this.error = <any>error;
          console.log(error);
        } );

    this.companyService.getContractors()
      .subscribe(
        contractorsData => {
          this.contractorsData = contractorsData;
        },
        error => {
          this.error = <any>error;
          console.log(error);
        } );
  }
}
