import { createApp } from 'vue'
import Application from './Application.vue'
import router from './router'
import axios from 'axios'

// Chemin de l'API
axios.defaults.baseURL = "http://localhost:3000/api"

createApp(Application).use(router, axios).mount('#application')