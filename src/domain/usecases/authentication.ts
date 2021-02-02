/* eslint-disable @typescript-eslint/no-unused-vars */
import { AccountModel } from '@/domain/models'
export interface AuthenticationParams {
  email: string;
  password: string;
}

export interface Authentication {
  auth(params: AuthenticationParams): Promise<Error | AccountModel>
}
