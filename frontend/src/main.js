import { createApp } from 'vue'

import Application from './Application.vue'
import router from './router'

createApp(Application).use(router).mount('#application')