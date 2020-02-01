import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex)

import auth from './modules/auth/auth'

const store = new Vuex.Store({
    modules: {
       auth
     }
})

export default store
