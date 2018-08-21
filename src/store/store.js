import Vue from 'vue'
import Vuex from 'vuex'
import { inventory, img, levels } from '../const/const'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentState: {},
    inventory: inventory,
    imgs: img,
    levels: levels
  },
  mutations: {
    mutation_test (state, payload) {
      console.log('STATE', state)
      console.log('PAYLOAD', payload)
      state.inventory.leg = payload.hello
    },
    updateCurrentState (state, payload) {
      console.log('CurrentState', state)
      console.log('CurrentPayload', payload)
      state.imgs =  {...payload}
    }
  }
})
