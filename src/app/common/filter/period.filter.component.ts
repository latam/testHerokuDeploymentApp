import {Component, EventEmitter, OnInit, Output} from "@angular/core";
import {MONTHS, MonthStruct} from "../../globals";
import {PeriodFilterCriteria} from "./period.filter.criteria";
@Component({
  selector: 'period-filter',
  templateUrl: './period.filter.component.html',
})
export class PeriodFilterComponent implements OnInit{
  monthsData = MONTHS;
  yearsData: Array<number>;
  selectedMonth: MonthStruct;
  selectedYear: number;

  date = new Date();

  @Output()
  public filterCriteriaChanged:EventEmitter<PeriodFilterCriteria> = new EventEmitter();

  constructor() { }

  ngOnInit() {
    this.yearsData = new Array<number>();
    for(let i = 1990; i < this.date.getFullYear() + 10; i++) {
      this.yearsData.push(i);
    }

    let month = this.date.getMonth();
    this.selectedMonth = this.monthsData[month];
    this.selectedYear = this.date.getFullYear();

    console.log(this.date);
    console.log(this.selectedYear);
    console.log(this.selectedMonth);

    this.refreshCriteria();
  }

  private refreshCriteria() {
    let periodFilterCriteria = new PeriodFilterCriteria(this.selectedMonth.monthNumber, this.selectedYear);
    console.log(periodFilterCriteria);
    console.log("Filter criteria: MONTH: " + periodFilterCriteria.month + " YEAR: " + periodFilterCriteria.year);
    this.filterCriteriaChanged.emit(periodFilterCriteria);
  }

  get selectedMonthMod() {
    return this.selectedMonth;
  }

  set selectedMonthMod(value) {
    console.log("Search criteria: MONTH changed - " + value.monthText);
    this.selectedMonth = value;
    this.refreshCriteria();
  }

  get selectedYearMod() {
    return this.selectedYear;
  }

  set selectedYearMod(value) {
    console.log("Search criteria: YEAR changed - " + value);
    this.selectedYear = value;
    this.refreshCriteria();
  }
}
