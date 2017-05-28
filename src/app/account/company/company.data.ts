/**
 * Created by Mateusz on 14.04.2017.
 */
export class CompanyData {
  constructor(
    public id: number,
    public name: string,
    public city: string,
    public postalCode: string,
    public street: string,
    public nip: string,
    public regon: string,
    public contractor: boolean) {}
}
