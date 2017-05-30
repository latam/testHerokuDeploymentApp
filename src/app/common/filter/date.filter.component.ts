import {Component, EventEmitter, OnInit, Output} from "@angular/core";
import {DatePipe} from "@angular/common";
import {NgbDateParserFormatter} from "@ng-bootstrap/ng-bootstrap";
import {DateFilterCriteria} from "./date.filter.criteria";
@Component({
  selector: 'date-filter',
  templateUrl: './date.filter.component.html',
})
export class DateFilterComponent implements OnInit{
  private date = new Date();
  private ngbFromDate = { day: 1, month: this.date.getMonth()+1, year: this.date.getFullYear()};
  private ngbToDate = { day: this.date.getDate(), month: this.date.getMonth()+1, year: this.date.getFullYear()};

  @Output()
  public filterCriteriaChanged:EventEmitter<DateFilterCriteria> = new EventEmitter();

  constructor(
    private datePipe: DatePipe,
    private ngbDateParserFormatter: NgbDateParserFormatter
  ) { }

  ngOnInit() {
    this.refreshCriteria();
  }

  private refreshCriteria() {
    let toDate = this.ngbDateParserFormatter.format(this.ngbToDate);
    let toDateString = this.datePipe.transform(toDate, 'yyyy-MM-dd');

    let fromDate = this.ngbDateParserFormatter.format(this.ngbFromDate);
    let fromDateString = this.datePipe.transform(fromDate, 'yyyy-MM-dd');

    let dateFilterCriteria = new DateFilterCriteria(fromDateString, toDateString);
    console.log("Filter criteria: FROM: " + dateFilterCriteria.fromDate + " TO: " + dateFilterCriteria.toDate);
    this.filterCriteriaChanged.emit(dateFilterCriteria);
  }

  get ngbToDateMod() {
    return this.ngbToDate;
  }

  set ngbToDateMod(value) {
    console.log("Filter criteria: TO date changed - " + value);
    this.ngbToDate = value;
    this.refreshCriteria();
  }

  get ngbFromDateMod() {
    return this.ngbFromDate;
  }

  set ngbFromDateMod(value) {
    console.log("Filter criteria: FROM date changed - " + value);
    this.ngbFromDate = value;
    this.refreshCriteria();
  }

}
