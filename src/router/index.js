import { createRouter, createWebHistory } from 'vue-router'

import HomePage from '../pages/HomePage.vue'
import StarSystemsPage from '../pages/StarSystemsPage.vue'
import PlanetsPage from '../pages/PlanetsPage.vue'
import OrbitalPositionsPage from '../pages/OrbitalPositionsPage.vue'
import PlanetDetailPage from '../pages/PlanetDetailPage.vue'
import RegisterPage from '../pages/RegisterPage.vue'
import BudgetPage from '../pages/BudgetPage.vue'


const routes = [
  { path: '/', name: 'Home', component: HomePage },
  { path: '/star-systems', name: 'StarSystems', component: StarSystemsPage },
  { path: '/planets', name: 'Planets', component: PlanetsPage },
  { path: '/planets/:id', name: 'PlanetDetail', component: PlanetDetailPage },
  { path: '/orbital-positions', name: 'OrbitalPositions', component: OrbitalPositionsPage },
  { path: '/register', name: 'Register', component: RegisterPage },
  { path: '/budget', name: 'Budget', component: BudgetPage },

]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
