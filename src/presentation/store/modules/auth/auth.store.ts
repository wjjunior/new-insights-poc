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
  SetLoading = 'SET_LOADING',
}

type Mutations = {
  [MutationType.SetLoading](state: State, value: boolean): void;
};

const mutations: MutationTree<State> & Mutations = {
  [MutationType.SetLoading] (state, value) {
    state.isLoading = value
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
enum ActionTypes {
  Login = 'LOGIN',
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
type ActionAugments = Omit<ActionContext<State, State>, 'commit'> & {
  commit<K extends keyof Mutations>(
    key: K,
    payload: Parameters<Mutations[K]>[1]
  ): ReturnType<Mutations[K]>;
};

type Actions = {
  [ActionTypes.Login](
    context: ActionAugments,
    credentials: { email: string; password: string }
  ): void;
};

const sleep = async (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms))
const actions: ActionTree<State, State> & Actions = {
  async [ActionTypes.Login] (
    { commit },
    credentials: { email: string; password: string }
  ) {
    commit(MutationType.SetLoading, true)
    await sleep(5000)
    commit(MutationType.SetLoading, false)
  }
}

type Getters = Record<string, unknown>;

const getters: GetterTree<State, State> & Getters = {}

export default {
  state,
  actions,
  mutations,
  getters
}
