import { createApp } from 'vue'
import { createStore } from 'vuex'

import Application from './Application.vue'
import router from './router'

const store = createStore({
  state () {
    return {
      count: 0
    }
  },
  mutations: {
    increment (state) {
      state.count++
    }
  }
})

createApp(Application).use(router).mount('#application')

Application.use(store)