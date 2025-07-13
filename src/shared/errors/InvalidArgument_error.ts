export class InvalidArgumentError extends Error {
  public readonly statusCode = 400;

  constructor(message: string) {
    super(message);
    this.name = "InvalidArgumentError";
  }
  
}