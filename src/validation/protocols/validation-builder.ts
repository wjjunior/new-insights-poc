import { FieldValidation } from '.'

/* eslint-disable @typescript-eslint/no-unused-vars */
export interface ValidationBuilder {
  required(): ValidationBuilder;
  email(): ValidationBuilder;
  min(length: number): ValidationBuilder;
  build(): FieldValidation[];
}
