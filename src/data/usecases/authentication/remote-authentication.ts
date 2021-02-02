import { AuthenticationParams } from '@/domain/usecases'
import { HttpPostClient, HttpStatusCode } from '@/data/protocols/http'
import { InvalidCredentialsError, UnexpectedError } from '@/domain/errors'
import { RemoteAuthentication } from '@/data/protocols/authentication/remote-authentication'
import { AccountModel } from '@/domain/models'

export const makeRemoteAuthentication = (
  url: string,
  httpPostClient: HttpPostClient<
        AuthenticationParams,
        AccountModel
      >
): RemoteAuthentication => ({
  auth: async (params: AuthenticationParams) => {
    const httpResponse = await httpPostClient.post({
      url: url,
      body: params
    })
    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        return httpResponse.body
      case HttpStatusCode.unauthorized:
        throw new InvalidCredentialsError()
      default:
        throw new UnexpectedError()
    }
  }
})
