// Importa la funció principal per iniciar una aplicació Vue.
import { createApp } from 'vue'

// Carrega els estils globals que s'aplicaran a tota l'aplicació.
import './style.css'

// Importa el component principal de l'aplicació, que serà el punt d'entrada visual.
import App from './App.vue'

// Importa el sistema de rutes, que permet navegar entre diferents vistes de l'aplicació.
import router from './router'

// Crea i configura la nostra aplicació Vue.
createApp(App)
    // Afegeix la funcionalitat de rutes a l'aplicació.
    .use(router)
    // Inicia l'aplicació i la connecta amb l'element HTML on es mostrarà.
    .mount('#app')