<template>
  <footer class="main-footer">
    <div class="footer-container">
      <div class="footer-section footer-info">
        <p class="footer-brand">RescuePets</p>
        <p class="footer-description">
          La teva solució completa per a la gestió de mascotes.
        </p>
      </div>

      <div class="footer-section footer-links">
        <h4 class="section-title">Enllaços Ràpids</h4>
        <ul>
          <li><a href="#" class="footer-nav-link">Inici</a></li>
          <li><a href="/api" class="footer-nav-link">Adorables Gossets!</a></li>
          <li><a href="/crud" class="footer-nav-link">Gestió de Gossos</a></li>
        </ul>
      </div>

      <div class="footer-section footer-contact">
        <h4 class="section-title">Contacte</h4>
        <p>Email: info@rescuepets.com</p>
        <p>Telèfon: +34 123 456 789</p>
      </div>
    </div>

    <div class="footer-bottom">
      <p class="footer-text">
        © {{ currentYear }}
        <a
            href="https://github.com/lluclopeziesebre" target="_blank"
            class="footer-link"
        >Lucas</a>
        — Tots els drets reservats
      </p>
    </div>
  </footer>
</template>

<script setup>
import { ref } from 'vue';

const currentYear = ref(new Date().getFullYear());
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800&display=swap');

.main-footer {
  background-color: #1a202c; /* Un gris oscuro casi negro */
  color: #e2e8f0; /* Un gris claro para el texto */
  padding: 3rem 1.5rem 1.5rem; /* Más padding arriba, menos abajo */
  margin-top: 4rem;
  font-family: 'Nunito', sans-serif;
  box-shadow: 0 -5px 20px rgba(0, 0, 0, 0.15);
}

.footer-container {
  max-width: 1000px; /* Un poco más ancho para las columnas */
  margin: 0 auto 2.5rem; /* Margen inferior para separar del copyright */
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); /* Columnas responsivas */
  gap: 2.5rem; /* Espacio entre columnas */
  padding-bottom: 2.5rem;
  border-bottom: 1px solid rgba(226, 232, 240, 0.1); /* Línea divisoria sutil */
}

.footer-section {
  text-align: left;
}

.footer-brand {
  font-size: 1.8rem; /* Tamaño de marca */
  font-weight: 800;
  color: #f8fafc; /* Blanco casi puro para la marca */
  margin-bottom: 0.75rem;
}

.footer-description {
  font-size: 0.9rem;
  line-height: 1.6;
  color: #cbd5e0; /* Un gris más oscuro para la descripción */
}

.section-title {
  font-size: 1.1rem;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 1.25rem;
  position: relative;
  padding-bottom: 0.5rem;
}

.section-title::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: 0;
  width: 2.5rem;
  height: 3px;
  background-color: #8e2de2; /* Lila */
  border-radius: 1.5px;
}

.footer-links ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer-links li {
  margin-bottom: 0.75rem;
}

.footer-nav-link {
  color: #cbd5e0;
  text-decoration: none;
  font-weight: 400;
  transition: all 0.3s ease;
}

.footer-nav-link:hover {
  color: #8e2de2; /* Lila al pasar el ratón */
  text-decoration: underline;
}

.footer-contact p {
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
  color: #cbd5e0;
}

.footer-bottom {
  text-align: center;
  padding-top: 1.5rem;
}

.footer-text {
  font-size: 0.95rem;
  font-weight: 400;
  line-height: 1.5;
}

.footer-link {
  font-weight: 600;
  text-decoration: none;
  background: linear-gradient(to right, #6a1bb2, #8e2de2); /* Degradado lila */
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  transition: all 0.3s ease;
}

.footer-link:hover {
  text-decoration: underline;
  opacity: 0.9;
  transform: translateY(-1px);
}

/* Media Queries para responsividad */
@media (max-width: 768px) {
  .footer-container {
    grid-template-columns: 1fr;
    gap: 2rem;
    text-align: center;
  }
  .section-title::after {
    left: 50%;
    transform: translateX(-50%);
  }
  .footer-section ul {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 1rem;
  }
  .footer-links li {
    margin-bottom: 0;
  }
}

@media (max-width: 480px) {
  .main-footer {
    padding: 2rem 1rem 1rem;
  }
  .footer-brand {
    font-size: 1.5rem;
  }
  .footer-text {
    font-size: 0.85rem;
  }
}
</style>