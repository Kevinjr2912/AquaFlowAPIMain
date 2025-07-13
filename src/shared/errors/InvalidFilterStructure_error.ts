export class InvalidFilterStructureError extends Error {
  public readonly statusCode = 422;

  constructor(message: string) {
    super(message);
    this.name = "InvalidFilterStructureError";
  }
}
