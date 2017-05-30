import {Component, OnInit} from "@angular/core";
import {CompanyData} from "./company.data";
import {CompanyService} from "../../service/company.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {CompanyModalComponent} from "./company.modal.component";
import {AuthenticationService} from "../../service/authentication.service";
import {Router} from "@angular/router";

@Component({
  selector: 'company-form',
  templateUrl: './company.component.html',
})
export class CompanyComponent implements OnInit{
  companyData = new CompanyData(1, '', '', '', '', '', '', false);
  contractorsData: CompanyData[];
  error: any;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private companyService: CompanyService,
    private modalService: NgbModal
  ) { }

  ngOnInit() {
    this.loadCompaniesData();
  }

  openCompanyEditionModal(companyToEdit: CompanyData) {
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
        this.loadCompaniesData();
      });
  }

  loadCompaniesData() {
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

  deleteContractor(contractorId: number) {
    this.companyService.deleteContractor(contractorId)
      .subscribe(
        () => {
          this.loadCompaniesData();
        },
        error => {
          this.error = error;
          if(error.errorCode == 11) {
            this.authenticationService.logout();
            this.router.navigate(['login']);
          }
          this.loadCompaniesData();
        }
      );
  }
}
