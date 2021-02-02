import { SetStorage } from '@/data/protocols/cache/set-storage'
import { SaveAccessToken } from '@/domain/usecases/save-access-token'

export const makeLocalSaveAccessToken = (setStorage: SetStorage): SaveAccessToken => ({
  save: async (accessToken: string): Promise<void> => {
    await setStorage.set('accessToken', accessToken)
  }
})
