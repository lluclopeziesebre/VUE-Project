<template>
  <header class="my-header w-full fixed top-0 left-0 z-50">
    <nav class="my-navbar flex justify-center py-4 px-4 sm:px-8">
      <router-link to="/" class="nav-link">Home</router-link>
      <router-link to="/api" class="nav-link">API Page</router-link>
      <router-link to="/crud" class="nav-link">CRUD Page</router-link>
    </nav>
  </header>
</template>

<script setup>
</script>

<style scoped>
.my-header {
  /* Fondo blanco puro con una ligera transparencia para que se integre mejor */
  background-color: rgba(255, 255, 255, 0.95); /* Blanco con 95% de opacidad */
  /* Eliminamos la sombra por completo */
  /* box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1); */
  text-align: center;
  color: #333; /* Color de texto por defecto más oscuro */
}

.my-navbar {
  gap: 2.5rem; /* Más espacio entre los enllaços */
}

.nav-link {
  color: #8e2de2; /* Blau principal per als enllaços */
  text-decoration: none;
  padding: 0.5rem 1rem; /* Més padding per a àrees de clic més grans */
  font-weight: 600; /* Text seminegreta */
  font-size: 1.05rem; /* Lleugerament més gran */
  transition: all 0.3s ease; /* Transició suau per a tots els canvis */
  position: relative; /* Per a l'efecte de subratllat personalitzat */
}

.nav-link:hover {
  color: #6a1bb2; /* Un blau una mica més fosc al passar el ratolí */
  text-decoration: none; /* Assegurar que no hi hagi subratllat natiu */
}

/* Efecte de subratllat animat a l'hover */
.nav-link::after {
  content: '';
  position: absolute;
  width: 0;
  height: 2px;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  background-color: #6a1bb2; /* Verd per al subratllat, donant un toc de color */
  transition: width 0.3s ease;
}

.nav-link:hover::after {
  width: 100%; /* El subratllat s'estén al 100% a l'hover */
}

/* Ajustos per a pantalles petites */
@media (max-width: 640px) {
  .my-navbar {
    gap: 1.5rem; /* Redueix l'espai en pantalles petites */
    flex-wrap: wrap; /* Permet que els enllaços es distribueixin en diverses línies si és necessari */
    justify-content: center;
  }

  .nav-link {
    font-size: 0.95rem; /* Mida de font lleugerament més petita */
    padding: 0.4rem 0.8rem;
  }
}
</style>