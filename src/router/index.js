import { createRouter, createWebHistory } from 'vue-router'
import LandingPage from '../views/LandingPage.vue'
import ApiPage from '../views/ApiPage.vue'
import CrudPage from '../views/CrudPage.vue'

const routes = [
    { path: '/', component: LandingPage },
    { path: '/api', component: ApiPage },
    { path: '/crud', component: CrudPage }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
