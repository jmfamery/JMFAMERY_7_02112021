import { createRouter, createWebHistory } from 'vue-router'
import Connexion from '../views/Connexion.vue'
import Inscription from '../views/Inscription.vue'
import SuppressionProfil from '../views/SuppressionProfil.vue'
import Deconnexion from '../views/Deconnexion.vue'
import Articles from '../views/Articles.vue'
import CreerArticles from '../views/CreerArticles.vue'
import ConsultationArticles from '../views/ConsultationArticles.vue'

const routes = [
  {
    path: '/',
    name: 'Connexion',
    component: Connexion
  },
  {
    path: '/Inscription',
    name: 'Inscription',
    component: Inscription
  },
  {
    path: '/SuppressionProfil',
    name: 'SuppressionProfil',
    component: SuppressionProfil,
    meta: {
      connecter: true
    }  
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
  {
    path: '/CreerArticles',
    name: 'CreerArticles',
    component: CreerArticles,
    meta: {
    connecter: true
    }
  },
  {
    path: '/ConsultationArticles',
    name: 'ConsultationArticles',
    component: ConsultationArticles,
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
