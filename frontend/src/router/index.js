import { createRouter, createWebHistory } from 'vue-router'
// import Accueil from '../views/Accueil.vue'
import Connexion from '../views/Connexion.vue'
// import CreationProfil from '../views/CreationProfil.vue'
import SuppressionProfil from '../views/SuppressionProfil.vue'
// import Deconnexion from '../views/Deconnexion.vue'
import Articles from '../views/Articles.vue'

const routes = [
  // {
  //   path: '/',
  //   name: 'Accueil',
  //   component: Accueil
  // },
  {
    path: '/',
    name: 'Connexion',
    component: Connexion
  },
  // {
  //   path: '/CreationProfil',
  //   name: 'CreationProfil',
  //   component: CreationProfil
  // },
  {
    path: '/SuppressionProfil',
    name: 'SuppressionProfil',
    component: SuppressionProfil
  },
  // {
  //   path: '/Deconnexion',
  //   name: 'Deconnexion',
  //   component: Deconnexion
  // },
  {
    path: '/Articles',
    name: 'Articles',
    component: Articles
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
