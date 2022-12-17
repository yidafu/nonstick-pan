export abstract class ApiException extends Error {
  get type() {
    return this.name;
  }

  get msg() {
    return this.message;
  }

  abstract code: number;

  // toString() {
  //   return `${this.type}(${this.code}) ${this.message}`;
  // }
}
