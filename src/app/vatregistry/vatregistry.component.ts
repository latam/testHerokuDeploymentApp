import {Component} from '@angular/core';
import 'rxjs/add/operator/toPromise';
import {VatRegistryData} from "./vatregistry.model";
import {VatRegistryService} from "../service/vatregistry.service";

import * as FileSaver from 'file-saver';
import {PeriodFilterCriteria} from "../common/filter/period.filter.criteria";
import {ErrorResponse} from "../common/error.response";

@Component({
  selector: 'vatregistry-view',
  templateUrl: './vatregistry.component.html',
})
export class VatRegistryComponent {
  registriesData: VatRegistryData[];
  periodFilterCriteria: PeriodFilterCriteria;
  error: ErrorResponse;

  constructor(
    private registryService: VatRegistryService,
  ) { }

  onPeriodFilterCriteriaChanged(periodFilterCriteria: PeriodFilterCriteria) {
    this.periodFilterCriteria = periodFilterCriteria;
    this.loadRegistryEntries();
  }

  loadRegistryEntries() {
    this.registryService.getRegistryEntries(this.periodFilterCriteria.month, this.periodFilterCriteria.year)
     .subscribe(
       registriesData => {
     this.registriesData = registriesData;
     console.log(this.registriesData);
     },
     error => {
     this.error = <any>error;
     console.log(this.error);
     } );
  }

  getReport() {
    this.registryService.getReport(this.periodFilterCriteria.month, this.periodFilterCriteria.year)
      .subscribe(
        (response) => {
          FileSaver.saveAs(response, "RejestrVat_" + this.periodFilterCriteria.month + "-" +this.periodFilterCriteria.year);
        },
        error => {
          this.error = error;
          console.log(error);
        }
      )
  }
}
