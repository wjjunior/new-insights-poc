/* eslint-disable @typescript-eslint/no-unused-vars */
import { AccessToken, Authentication } from '@/domain/usecases'
import { AccountModel } from '@/domain/models'
import { ActionContext, ActionTree, MutationTree, GetterTree } from 'vuex'

type State = {
  isLoading: boolean;
  errorMessage: string;
};

const initialState = (): State => ({
  isLoading: false,
  errorMessage: ''
})

const state: State = initialState()

enum MutationType {
  Reset = 'RESET',
  SetLoading = 'SET_LOADING',
  SetErrorMessage = 'SET_ERROR_MESSAGE',
}

type Mutations = {
  [MutationType.Reset](state: State): void;
  [MutationType.SetLoading](state: State, value: boolean): void;
  [MutationType.SetErrorMessage](state: State, value: string): void;
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
  }
}

export enum ActionTypes {
  Login = 'LOGIN',
  Reset = 'RESET',
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
  [ActionTypes.Reset](context: ActionAugments): void;
};

const sleep = async (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms))
const actions: ActionTree<State, State> & Actions = {
  async [ActionTypes.Login] ({ commit }, { credentials, authentication, accessToken }) {
    try {
      commit(MutationType.SetLoading, true)

      const account = await authentication.auth({
        email: credentials.email,
        password: credentials.password
      })

      await accessToken.save((account as AccountModel).accessToken)

      commit(MutationType.SetLoading, false)
    } catch (error) {
      commit(MutationType.SetLoading, false)
      commit(MutationType.SetErrorMessage, error.message)
    }
  },

  async [ActionTypes.Reset] ({ commit }) {
    commit(MutationType.Reset)
  }
}

type Getters = Record<string, unknown>;

const getters: GetterTree<State, State> & Getters = {}

export const module = {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
}
