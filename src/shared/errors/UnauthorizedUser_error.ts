export class UnauthorizedUserError extends Error {
  public readonly statusCode = 401;
  constructor(message: string) {
    super(message);
    this.name = "UnauthorizedUserError";
  }
}