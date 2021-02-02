import { makeRemoteAuthentication } from '@/data/usecases/authentication/remote-authentication'
import { Authentication } from '@/domain/usecases'
import { makeApiUrl, makeAxiosHttpClient } from '@/main/factories/http'

export const makeRemoteAuthenticationUrl = (): Authentication => {
  return makeRemoteAuthentication(makeApiUrl('/login'), makeAxiosHttpClient())
}
