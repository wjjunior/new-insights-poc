import { AccountModel } from '@/domain/models'
import { AuthenticationParams } from '@/domain/usecases'
export interface RemoteAuthentication<T = any> {
  auth: (params: AuthenticationParams) => Promise<Error | AccountModel>
}
