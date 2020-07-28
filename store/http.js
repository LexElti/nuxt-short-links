export const state = () => ({
  loading: false,
  error: null
})

export const mutations = {
  setLoading(state, loading) {
    state.loading = loading
  },
  setError(state, error) {
    state.error = error
  }
}

export const actions = {
  async request({commit, dispatch}, {url, method = 'GET', body = null, headers = {}}) {
    commit('setLoading', true)
    try {
      if (body) {
        body = JSON.stringify(body)
        headers['Content-Type'] = 'application/json'
      }
      const response = await fetch(url, {method, body, headers})
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong')
      }

      commit('setLoading', false)

      return data
    } catch (e) {
      commit('setLoading', false)
      commit('setError', e.message)
      throw e
    }
  },
  clearError() {
    commit('setError', null)
  }
}

export const getters = {
  loading: state => state.loading,
  error: state => state.error
}
