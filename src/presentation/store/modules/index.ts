import {
  module as Auth,
  ActionTypes as AuthActionTypes,
  GetterTypes as AuthGetterTypers
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

export const GetterTypes = {
  ...mapType('Auth', AuthGetterTypers)
}

export const modules = {
  Auth
}
