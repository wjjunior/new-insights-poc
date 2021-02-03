import { makeLocalAccessToken } from '@/data/usecases/access-token/local-access-token'
import { AccessToken } from '@/domain/usecases'
import { makeLocalStorageAdapter } from '@/main/factories/cache/local-storage-adapter-factory'

export const makeLocalAccessTokenFactory = (): AccessToken => {
  return makeLocalAccessToken(makeLocalStorageAdapter())
}
