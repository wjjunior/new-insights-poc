import { FieldValidation } from '@/validation/protocols/field-validation'

/* eslint-disable @typescript-eslint/no-unused-vars */
export interface Validation {
    build?(value: FieldValidation[]): void
    validate(fieldName: string, fieldValue: string): string
}
