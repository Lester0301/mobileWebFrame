
import * as types from './mutation-types'

const mutations = {
  [types.SET_Left_Login_Show](state, flag){
    state.leftLoginShow = flag
  },
  [types.SET_Login_State](state, flag){
    state.loginState = flag
  }

}


export default mutations
