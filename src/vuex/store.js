/*
* Created by Lester.Lee on 2018/1/30
* */

import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
// import getters from './getters'
import mutations from './mutations'
import actions from './actions'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'


export default new Vuex.Store({
  actions,
  state,
  // getters,
  mutations,
  strict:debug
})
