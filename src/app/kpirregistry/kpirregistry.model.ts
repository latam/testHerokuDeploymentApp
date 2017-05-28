import {CompanyData} from "../account/company/company.data";

export class KpirRegistryData {
  constructor(public position: number,
              public date: string,
              public docNumber: string,
              public contractor: CompanyData,
              public description: string,
              public revProductServices: number,
              public revOther: number,
              public revCombined: number,
              public purchaseGoodsMaterials: number,
              public insuranceCost: number,
              public expPayment: number,
              public expOther: number,
              public expCombined: number,
              public points: string,) {
  }
}
