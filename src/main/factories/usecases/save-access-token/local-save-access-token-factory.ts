import { makeLocalSaveAccessToken } from '@/data/usecases/access-token/local-access-token'
import { AccessToken } from '@/domain/usecases'
import { makeLocalStorageAdapter } from '@/main/factories/cache/local-storage-adapter-factory'

export const makeLocalSaveAccessTokenFactory = (): AccessToken => {
  return makeLocalSaveAccessToken(makeLocalStorageAdapter())
}
