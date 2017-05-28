import {CompanyData} from "../account/company/company.data";
/**
 * Created by Mateusz on 24.04.2017.
 */
export class VatRegistryData {
  constructor(
    public position: number,
    public date: string,
    public purchase: boolean,
    public docNumber: string,
    public contractor: CompanyData,
    public description: string,
    public vatBid: string,
    public nettoValue: number,
    public vatValue: number
  ) {}
}
