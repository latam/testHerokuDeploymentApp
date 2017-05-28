export class ErrorResponse {
  constructor(
    public status: string,
    public message: string,
    public errorCode: number,
    public devMessage: string
  ) {}
}
