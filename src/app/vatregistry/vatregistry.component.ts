/**
 * Created by Mateusz on 24.04.2017.
 */
import {Component, OnInit} from '@angular/core';
import 'rxjs/add/operator/toPromise';
import {VatRegistryData} from "./vatregistry.model";
import {VatRegistryService} from "../service/vatregistry.service";
import {MONTHS, MonthStruct} from "../globals";

import * as FileSaver from 'file-saver';

@Component({
  selector: 'vatregistry-view',
  templateUrl: './vatregistry.component.html',
})
export class VatRegistryComponent implements OnInit{
  registriesData: VatRegistryData[];
  monthsData = MONTHS;
  yearsData = [2015, 2016, 2017];
  selectedMonth: MonthStruct;
  selectedYear: number;
  error = '';

  constructor(
    private registryService: VatRegistryService,
  ) { }

  ngOnInit() {
    let yearNumber = new Date().getUTCFullYear();
    let monthNumber = new Date().getUTCMonth()+1;
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
    this.registryService.getReport(this.selectedMonth.monthNumber, this.selectedYear)
      .subscribe(
        (response) => {
          FileSaver.saveAs(response, "RejestrVat_"+this.selectedMonth.monthText+this.selectedYear);
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
