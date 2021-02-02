import { Storage } from '@/data/protocols/cache/storage'

export const localStorageAdapter = (): Storage => ({
  set: async (key: string, value: any): Promise<void> => {
    localStorage.setItem(key, value)
  },
  get: async (key: string): Promise<string | null> => {
    return localStorage.getItem(key)
  }
})
