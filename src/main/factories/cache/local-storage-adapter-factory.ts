import { Storage } from '@/data/protocols/cache/storage'
import { localStorageAdapter } from '@/infra/cache/local-storage-adapter'

export const makeLocalStorageAdapter = (): Storage => {
  return localStorageAdapter()
}
