// Importa les funcions necessàries de la llibreria Vue Router per crear i gestionar rutes.
import { createRouter, createWebHistory } from 'vue-router'

// Importa els diferents components de pàgina que l'aplicació podrà mostrar.
import LandingPage from '../views/LandingPage.vue'
import ApiPage from '../views/ApiPage.vue'
import CrudPage from '../views/CrudPage.vue'

// Defineix les rutes de l'aplicació.
// Cada objecte dins d'aquest array associa un camí (URL) amb un component de pàgina.
const routes = [
    // Ruta per a la pàgina d'inici.
    { path: '/', component: LandingPage },
    // Ruta per a la pàgina de l'API.
    { path: '/api', component: ApiPage },
    // Ruta per a la pàgina CRUD.
    { path: '/crud', component: CrudPage }
]

// Crea la instància del router.
const router = createRouter({
    // Configura el mode d'historial per a la navegació web.
    history: createWebHistory(),
    // Assigna les rutes definides anteriorment al router.
    routes
})

// Exporta la instància del router perquè pugui ser utilitzada en altres parts de l'aplicació (com ara a 'main.js').
export default router