export const state = () => ({
  token: null,
  userId: null
})

export const mutations = {
  setToken(state, token) {
    state.token = token
  },
  setUserId(state, userId) {
    state.userId = userId
  }
}

export const actions = {
  login({commit, dispatch}, {token, userId}) {
    commit('setToken', token)
    commit('setUserId', userId)

		localStorage.setItem('userData', JSON.stringify({
			userId: userId, token: token
		}))
  },
  logout({commit, dispatch}) {
    commit('setToken', null)
    commit('setUserId', null)

    localStorage.removeItem('userData')
  }
}

export const getters = {
  isAuth: state => Boolean(state.token),
  token: state => state.token
}
