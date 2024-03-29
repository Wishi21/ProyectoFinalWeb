import Vue from 'vue'
import VueRouter from 'vue-router'
import Inicio from '../views/Inicio.vue'
import Categorias from '../views/Categorias/Categorias'
import Personal from '../views/Personal/Personal'
import Tickets from '../views/Tickets/Tickets'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Inicio',
    component: Inicio
  },
  {
    path: '/categorias',
    name: 'Categorias',
    component: Categorias
  },
  {
    path: '/personal',
    name: 'personal',
    component: Personal
  },
  {
    path: '/tickets',
    name: 'tickets',
    component: Tickets
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
