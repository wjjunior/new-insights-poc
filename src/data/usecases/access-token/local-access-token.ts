import { Storage } from '@/data/protocols/cache/storage'
import { AccessToken } from '@/domain/usecases/access-token'

export const makeLocalAccessToken = (storage: Storage): AccessToken => ({
  save: async (accessToken: string): Promise<void> => {
    await storage.set('accessToken', accessToken)
  },
  get: async (): Promise<string | null | void> => {
    return await storage.get('accessToken')
  }
})
