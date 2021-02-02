/* eslint-disable @typescript-eslint/no-unused-vars */
export interface FieldValidation {
  field: string,
  validate(value: string): Error;
  setError?(value: Error): void
}
