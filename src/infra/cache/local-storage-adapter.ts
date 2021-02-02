import { SetStorage } from '@/data/protocols/cache/set-storage'

export const localStorageAdapter = (): SetStorage => ({
  set: async (key: string, value: any): Promise<void> => {
    localStorage.setItem(key, value)
  }
})
