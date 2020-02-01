const state = {
    //if there are a token in the localStorage, if not we save null in token
    token: localStorage.getItem('access_token') || null,
    // user state initialized on an empty object
    user : {}
}

const getters = {
    //if user is logged
    loggedIn(state) {
        return state.token !== null
    },

    //if user role is admin
    isAdmin(state) {
        if (state.user) {
            if (state.user.role === "admin") {
                return true
            }
        }
        return false
    }
};

const mutations = {
  updateUserDetails(state, user) {
    state.user = user
  },
  authSuccess(state, token, user) {
    state.token = token
    state.user = user
  },
  destroyToken(state) {
    state.token = null
    state.user = {}
  }
};

const actions = {
  retrieveToken(context, credentials) {

    return new Promise((resolve, reject) => {
      axios.post('/api/login', {
        username: credentials.username,
        password: credentials.password,
      })
        .then(response => {
          const token = response.data.success.token
          localStorage.setItem('access_token', token)
          context.commit('authSuccess', token)
          resolve(response)
        })
        .catch(error => {
            reject(error)
        })
    })

  },
  register(context, data) {
        return new Promise((resolve, reject) => {
          axios.post('/api/register', {
            name: data.name,
            email: data.email,
            username: data.username,
            password: data.password,
            password_confirmation: data.password_confirmation,
          })
            .then(response => {
              resolve(response)
            })
            .catch(error => {
              reject(error)
            })
        })
    },
  refresh(context) {

    axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token
      return new Promise((resolve, reject) => {
        axios.post('/api/details')
          .then(response => {
              const user = response.data.success
              context.commit('updateUserDetails', user)
            resolve(response)
          })
          .catch(error => {
            localStorage.removeItem('access_token')
            context.commit('destroyToken')

            reject(error)
          })
      })

  },
  destroyToken(context) {

    axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token

    if (context.getters.loggedIn){

      return new Promise((resolve, reject) => {
        axios.get('/api/logout')
          .then(response => {
            //console.log(response)
            localStorage.removeItem('access_token')
            context.commit('destroyToken')

            resolve(response)
          })
          .catch(error => {
            localStorage.removeItem('access_token')
            context.commit('destroyToken')

            reject(error)
          })
      })

    }
  }
}


export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
