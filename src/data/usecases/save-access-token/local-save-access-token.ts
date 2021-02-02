import { Storage } from '@/data/protocols/cache/storage'
import { SaveAccessToken } from '@/domain/usecases/save-access-token'

export const makeLocalSaveAccessToken = (storage: Storage): SaveAccessToken => ({
  save: async (accessToken: string): Promise<void> => {
    await storage.set('accessToken', accessToken)
  }
})
