import {CompanyData} from "../company/company.data";
/**
 * Created by Mateusz on 04.04.2017.
 */
export class RegistrationData {
  constructor(
  public userName: string,
  public password: string,
  public firstName: string,
  public lastName: string,
  public email: string,
  public company: CompanyData) {}
}
