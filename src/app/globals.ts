//export const BaseApiPath: string = 'https://company-management.herokuapp.com/api/';
export const BaseApiPath: string = 'http://localhost:8080/api/';


export class MonthStruct {
  constructor(
    public monthText: string,
    public monthNumber: number
  ) {}
}

export const MONTHS: MonthStruct[] = [
  {monthNumber: 1, monthText: 'Styczeń'},
  {monthNumber: 2, monthText: 'Luty'},
  {monthNumber: 3, monthText: 'Marzec'},
  {monthNumber: 4, monthText: 'Kwiecień'},
  {monthNumber: 5, monthText: 'Maj'},
  {monthNumber: 6, monthText: 'Czerwiec'},
  {monthNumber: 7, monthText: 'Lipiec'},
  {monthNumber: 8, monthText: 'Sierpień'},
  {monthNumber: 9, monthText: 'Wrzesień'},
  {monthNumber: 10, monthText: 'Październik'},
  {monthNumber: 11, monthText: 'Listopad'},
  {monthNumber: 12, monthText: 'Grudzień'}
];
