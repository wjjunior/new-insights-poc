import {
  module as Auth,
  ActionTypes as AuthActionTypes
} from './auth/auth.store'

const mapType = (moduleName: string, obj: Record<string, unknown>): Record<string, unknown> => {
  Object.keys(obj).map(function (key) {
    obj[key] = `${moduleName}/${obj[key]}`
    return obj
  })
  return obj
}

export const ActionTypes = {
  ...mapType('Auth', AuthActionTypes)
}

export const modules = {
  Auth
}
