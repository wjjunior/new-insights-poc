/* eslint-disable @typescript-eslint/no-unused-vars */
import { AccessToken, Authentication } from '@/domain/usecases'
import { AccountModel } from '@/domain/models'
import { ActionContext, ActionTree, MutationTree, GetterTree } from 'vuex'

type State = {
  isLoading: boolean;
  errorMessage: string;
  isAuthenticated: boolean;
};

const initialState = (): State => ({
  isLoading: false,
  errorMessage: '',
  isAuthenticated: false
})

const state: State = initialState()

enum MutationType {
  Reset = 'RESET',
  SetLoading = 'SET_LOADING',
  SetErrorMessage = 'SET_ERROR_MESSAGE',
  SetIsAuthenticated = 'SET_IS_AUTHENTICATED'
}

type Mutations = {
  [MutationType.Reset](state: State): void;
  [MutationType.SetLoading](state: State, value: boolean): void;
  [MutationType.SetErrorMessage](state: State, value: string): void;
  [MutationType.SetIsAuthenticated](state: State, value: boolean): void;
};

const mutations: MutationTree<State> & Mutations = {
  [MutationType.Reset] (state) {
    const newState = initialState()
    Object.keys(newState).forEach((key) => {
      state[key] = newState[key]
    })
  },
  [MutationType.SetLoading] (state, value) {
    state.isLoading = value
  },
  [MutationType.SetErrorMessage] (state, value) {
    state.errorMessage = value
  },
  [MutationType.SetIsAuthenticated] (state, value) {
    state.isAuthenticated = value
  }
}

export enum ActionTypes {
  Login = 'LOGIN',
  Reset = 'RESET',
  CheckAuthentication = 'CHECK_AUTHENTICATION'
}

type ActionAugments = Omit<ActionContext<State, State>, 'commit'> & {
  commit<K extends keyof Mutations>(
    key: K,
    payload?: Parameters<Mutations[K]>[1]
  ): ReturnType<Mutations[K]>;
};

type Actions = {
  [ActionTypes.Login](
    context: ActionAugments,
    params: {
      credentials: {
        email: string;
        password: string;
      };
      authentication: Authentication;
      accessToken: AccessToken

    }
  ): void;
  [ActionTypes.CheckAuthentication](
    context: ActionAugments,
    params: {
      accessToken: AccessToken
    }
  ): void
};

const actions: ActionTree<State, State> & Actions = {
  async [ActionTypes.Login] ({ commit }, { credentials, authentication, accessToken }) {
    try {
      commit(MutationType.SetLoading, true)

      const account = await authentication.auth({
        email: credentials.email,
        password: credentials.password
      })

      await accessToken.save((account as AccountModel).accessToken)

      commit(MutationType.SetIsAuthenticated, true)

      commit(MutationType.SetLoading, false)
    } catch (error) {
      commit(MutationType.SetLoading, false)
      commit(MutationType.SetErrorMessage, error.message)
    }
  },
  async [ActionTypes.CheckAuthentication] ({ commit }, { accessToken }) {
    try {
      const token = await accessToken.get()
      commit(MutationType.SetIsAuthenticated, !!token)
    } catch (error) {
      commit(MutationType.SetErrorMessage, error.message)
    }
  }
}

export enum GetterTypes {
  isAuthenticated = 'IS_AUTHENTICATED',
  errorMessage = 'ERROR_MESSAGE'
}

type Getters = {
  [GetterTypes.isAuthenticated] (state: State): boolean
  [GetterTypes.errorMessage] (state: State): string
}

const getters: GetterTree<State, State> & Getters = {
  [GetterTypes.isAuthenticated] (state) {
    return state.isAuthenticated
  },
  [GetterTypes.errorMessage] (state) {
    return state.errorMessage
  }
}

export const module = {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
}
