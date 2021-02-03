import { Store as VuexStore, createLogger } from 'vuex'

import { modules } from './modules'

export const store = new VuexStore({
  plugins: process.env.NODE_ENV === 'development' ? [createLogger()] : [],
  modules,
  actions: {
    reset ({ commit }) {
      Object.keys(modules).forEach((moduleName) => {
        commit(`${moduleName}/RESET`)
      })
    }
  }
})
