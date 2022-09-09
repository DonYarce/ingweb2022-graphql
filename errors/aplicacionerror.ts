export class AplicacionError extends Error {
  code: number;

  constructor(code: number, message: string) {
    super(message);
    this.name = "AplicacionError";
    this.code = code;
    
    Object.setPrototypeOf(this, AplicacionError.prototype);
  }
}
