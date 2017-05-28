import {Component, OnInit} from '@angular/core';
import 'rxjs/add/operator/toPromise';
import {MONTHS, MonthStruct} from "../globals";
import {KpirRegistryData} from "./kpirregistry.model";
import {KpirRegistryService} from "../service/kpirregistry.service";

import * as FileSaver from 'file-saver';

@Component({
  selector: 'kpirregistry-view',
  templateUrl: './kpirregistry.component.html',
})
export class KpirRegistryComponent implements OnInit{
  registriesData: KpirRegistryData[];
  monthsData = MONTHS;
  yearsData = [2015, 2016, 2017];
  selectedMonth: MonthStruct;
  selectedYear: number;
  error = '';

  constructor(
    private registryService: KpirRegistryService,
  ) { }

  ngOnInit() {
    let yearNumber = new Date().getUTCFullYear();
    let monthNumber = new Date().getUTCMonth();
    this.selectedMonth = MONTHS[monthNumber];
    this.selectedYear = yearNumber;
    this.refreshComponent();
  }

  refreshComponent() {
    this.registryService.getRegistryEntries(this.selectedMonth.monthNumber, this.selectedYear)
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
    this.registryService.getReport(this.selectedYear)
      .subscribe(
        (response) => {
          FileSaver.saveAs(response, "KPIR_" + this.selectedYear);
        },
        error => {
          this.error = error;
          console.log(error);
        }
      )
  }

  get selectedMonthMod() {
    return this.selectedMonth;
  }

  set selectedMonthMod(value) {
    console.log("Search criteria: MONTH changed - " + value.monthText);
    this.selectedMonth = value;
    this.refreshComponent();
  }

  get selectedYearMod() {
    return this.selectedYear;
  }

  set selectedYearMod(value) {
    console.log("Search criteria: YEAR changed - " + value);
    this.selectedYear = value;
    this.refreshComponent();
  }
}
