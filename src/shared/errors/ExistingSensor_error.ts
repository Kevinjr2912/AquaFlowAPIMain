export class ExistingSensorError extends Error {
  public readonly statusCode = 409;

  constructor(message: string){
    super(message);
    this.name = "ExistingSensorError"
  }
}
