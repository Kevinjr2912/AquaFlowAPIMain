export class FilterNotFoundError extends Error {
  public readonly statusCode = 404;
  constructor(message: string) {
    super(message);
    this.name = "FilterNotFoundError";
  }
}