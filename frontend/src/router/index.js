import { createRouter, createWebHistory } from 'vue-router'
import Connexion from '../views/Connexion.vue'
import SuppressionProfil from '../views/SuppressionProfil.vue'
import Deconnexion from '../views/Deconnexion.vue'
import Articles from '../views/Articles.vue'

const routes = [
  {
    path: '/',
    name: 'Connexion',
    component: Connexion
  },
  {
    path: '/SuppressionProfil',
    name: 'SuppressionProfil',
    component: SuppressionProfil
  },
  {
    path: '/Deconnexion',
    name: 'Deconnexion',
    component: Deconnexion
  },
  {
    path: '/Articles',
    name: 'Articles',
    component: Articles,
    meta: {
      connecter: true
    }
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach ((to, from, next) => {
  if (to.matched.some(enregistrement => enregistrement.meta.connecter)) {
    if (localStorage.getItem('Utilisateur')) {
      next()
    } else {
      next({
        path: '/',
        query: {
          redirect: to.fullPath
        }
      })
    } 
  } else {
    next()
  }
})

export default router
