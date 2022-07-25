export abstract class StringValueObject {
  readonly value: string;

  constructor(value: string) {
    this.value = value;
  }

  toString() {
    return this.value;
  }
}
