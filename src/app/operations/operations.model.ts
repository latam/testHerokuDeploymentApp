import {CompanyData} from "../account/company/company.data";
/**
 * Created by Mateusz on 18.04.2017.
 */

export class OperationData {
  constructor(
    public id: number,
    public date: string,
    public docNumber: string,
    public contractor: CompanyData,
    public description: string,
    public purchase: boolean,
    public type: string,
    public kpirColumn: number,
    public vatBid: number,
    public nettoValue: number
  ) {}
}

export class KpirColumn {
  constructor(
    public name: string,
    public id: number
  ) {}
}

export const KPIR_REVENUE: KpirColumn[] = [
  {id: 7, name: 'Sprzedaż towarów i usług'},
  {id: 8, name: 'Pozostałe przychody'}
];

export const KPIR_EXPENSE: KpirColumn[] = [
  {id: 10, name: 'Zakup towarów handlowych i materiałów'},
  {id: 11, name: 'Koszty ubezpieczenia zakupu'},
  {id: 12, name: 'Wynagrodzenie w gotówce i naturze'},
  {id: 13, name: 'Pozostałe wydatki'},
];
