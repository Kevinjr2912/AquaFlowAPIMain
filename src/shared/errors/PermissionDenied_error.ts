export class PermissionDeniedError extends Error {
  public readonly statusCode = 403;

  constructor(message: string) {
    super(message);
    this.name = "PermissionDeniedError";
  }
}
