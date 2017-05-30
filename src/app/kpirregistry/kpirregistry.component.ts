import {Component} from '@angular/core';
import 'rxjs/add/operator/toPromise';
import {KpirRegistryData} from "./kpirregistry.model";
import {KpirRegistryService} from "../service/kpirregistry.service";

import * as FileSaver from 'file-saver';
import {PeriodFilterCriteria} from "../common/filter/period.filter.criteria";
import {ErrorResponse} from "../common/error.response";

@Component({
  selector: 'kpirregistry-view',
  templateUrl: './kpirregistry.component.html',
})
export class KpirRegistryComponent {
  registriesData: KpirRegistryData[];
  periodFilterCriteria: PeriodFilterCriteria;
  error: ErrorResponse;


  constructor(
    private registryService: KpirRegistryService,
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
    this.registryService.getReport(this.periodFilterCriteria.year)
      .subscribe(
        (response) => {
          FileSaver.saveAs(response, "KPIR_" + this.periodFilterCriteria.year);
        },
        error => {
          this.error = error;
          console.log(error);
        }
      )
  }
}
