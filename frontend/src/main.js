import { createApp } from 'vue'
import Application from './Application.vue'
import router from './router'
import axios from 'axios'

// const instance = axios.create({
//   baseURL : 'http://localhost:3000/api'
// })

// const utilisateur = JSON.parse(localStorage.getItem("Utilisateur"))
// instance.defaults.headers.common['Authorization'] = utilisateur.token
// axios.defaults.headers.common['Authorization'] = utilisateur.token

axios.defaults.baseURL = "http://localhost:3000/api"

createApp(Application).use(router, axios).mount('#application')