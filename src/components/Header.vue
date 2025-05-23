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
// Aquest component no necessita lògica JavaScript específica per ara.
</script>

<style scoped>
/* Estils generals per a la capçalera. */
.my-header {
  /* Fons amb lleugera transparència. */
  background-color: rgba(255, 255, 255, 0.95);
  text-align: center;
  color: #333;
}

/* Estils per a la barra de navegació. */
.my-navbar {
  /* Espaiat entre els elements de navegació. */
  gap: 2.5rem;
}

/* Estils per als enllaços de navegació individuals. */
.nav-link {
  color: #8e2de2;
  text-decoration: none;
  padding: 0.5rem 1rem;
  font-weight: 600;
  font-size: 1.05rem;
  transition: all 0.3s ease;
  position: relative;
}

/* Estils per als enllaços de navegació en estat "hover". */
.nav-link:hover {
  color: #6a1bb2;
  text-decoration: none;
}

/* Efecte de subratllat animat que apareix en passar el ratolí per sobre. */
.nav-link::after {
  content: '';
  position: absolute;
  width: 0;
  height: 2px;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  background-color: #6a1bb2;
  transition: width 0.3s ease;
}

/* Quan el ratolí passa per sobre, el subratllat s'estén. */
.nav-link:hover::after {
  width: 100%;
}

/* Ajustos de disseny per a pantalles petites. */
@media (max-width: 640px) {
  /* Reducció de l'espaiat i ajust per a elements en línies múltiples. */
  .my-navbar {
    gap: 1.5rem;
    flex-wrap: wrap;
    justify-content: center;
  }

  /* Ajust de la mida de la font dels enllaços. */
  .nav-link {
    font-size: 0.95rem;
    padding: 0.4rem 0.8rem;
  }
}
</style>