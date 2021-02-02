import { Storage } from '@/data/protocols/cache/storage'
import { GetAccessToken } from '@/domain/usecases/get-access-token'

export const makeLocalGetAccessToken = (storage: Storage): GetAccessToken => ({
  get: async (key: string, value?: any): Promise<string | null | void> => {
    return await storage.get(key, value)
  }
})
