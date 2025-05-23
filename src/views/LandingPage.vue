<template>
  <div class="page-container">
    <h1>Benvingut a RescuePets!</h1>
    <p class="subtitle">Aquesta és la pàgina principal del nostre projecte per salvar les vides animals. 🎉</p>
    <br>
    <section class="contenidor">
      <h2>🐾 Salvant Vides, Donant Esperança 🐾</h2>
      <p>
        A nom de <strong>RescuePets</strong>, lluitem cada dia per canviar la vida d’aquells que no tenen veu.
        Rescatem, cuidem i donem una segona oportunitat a animals abandonats, maltractats o en situació de risc.
      </p>
      <p>
        Amb amor, paciència i compromís, transformem històries de dolor en històries d’esperança.
        Cada animal que rescatem no és només una vida salvada, és una promesa de futur millor.
      </p>
      <p>
        📍 Treballem amb veterinaris, famílies acollidores i voluntaris que comparteixen el nostre objectiu:
        que cap animal quede enrere.
      </p>
      <p>🤝 Ajuda’ns a seguir salvant vides <strong>adoptant, acollint i donant.</strong></p>
      <p>
        <strong>Junts, podem fer que el món siga un lloc més just per a tots els éssers vius.</strong>
      </p>
      <p class="final-phrase">
        <span class="animal-emojis">🐶🐱🦜🐰</span><br>
        <em>Gràcies per creure en segones oportunitats.</em>
      </p>
    </section>
    <img
        src="https://i.pinimg.com/474x/db/d7/a6/dbd7a6c4e936572b679455eda8b5828a.jpg"
        alt="Animal rescatat"
        class="imatge-rescatat"
    />
  </div>
</template>

<script setup>
// Cap script necessari per a aquests estils
</script>

<style scoped>
/* Importa la font de Google Fonts */
@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&display=swap');

/* Variables de color per facilitar canvis futurs */
:root {
  --primary-color: #3498db; /* Blau principal (el que ja tenies) */
  --secondary-color: #2ecc71; /* Un verd amable per accents */
  --tertiary-color: #f39c12; /* Un taronja càlid per a detalls */
  --text-color: #333;
  --light-text-color: #555;
  --dark-text-color: #2c3e50; /* Per a text important */
  --background-gradient-start: #f4f7f6;
  --background-gradient-end: #e9f1f0;
  --container-bg: #ffffff;
  --shadow-color: rgba(0, 0, 0, 0.1);
  --highlight-color: #ff7f50; /* Coral per a detalls que cridin l'atenció */
}

/* Keyframes per a l'animació del títol */
@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Estils globals per a la pàgina dins del component */
.page-container {
  font-family: 'Nunito', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  background: linear-gradient(135deg, var(--background-gradient-start) 0%, var(--background-gradient-end) 100%);
  position: relative; /* Per a la capa de degradat radial */
  overflow: hidden; /* Per assegurar que el degradat no surti */
  color: var(--text-color);
  padding: 2.5rem 1rem; /* Espaiat general per a mòbils primer */
  min-height: 100vh; /* Ocupar tota l'alçada de la pantalla */
  box-sizing: border-box;
  display: flex; /* Utilitzar flexbox per centrar el contingut */
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

/* Capa de degradat radial subtil per a més textura */
.page-container::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(circle at center, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 70%);
  pointer-events: none; /* Permet que els clics passin a través */
}

h1 {
  color: var(--primary-color);
  font-size: 3.2rem; /* Mida més gran i impactant */
  font-weight: 700;
  text-align: center;
  margin-bottom: 0.8rem;
  text-shadow: 2px 2px 5px var(--shadow-color); /* Ombra més pronunciada */
  animation: fadeInDown 1s ease-out forwards; /* Animació d'aparició */
}

.subtitle {
  text-align: center;
  font-size: 1.25rem; /* Més gran i llegible */
  color: var(--dark-text-color); /* Color més fosc per a major contrast */
  margin-bottom: 3rem; /* Més espai abans del contenidor */
  max-width: 600px;
}

.contenidor {
  max-width: 800px;
  margin: 2rem auto; /* Més marge superior/inferior */
  padding: 3rem;   /* Més espai interior */
  background-color: var(--container-bg);
  border-radius: 20px; /* Cantonades més arrodonides */
  box-shadow: 0 10px 30px var(--shadow-color); /* Ombra més pronunciada i suau */
  text-align: left;
  transition: transform 0.4s ease-in-out, box-shadow 0.4s ease-in-out;
  border: 1px solid rgba(200, 200, 200, 0.3); /* Borde subtil */
  position: relative;
  z-index: 1; /* Assegura que el contenidor estigui per sobre del degradat */
}

.contenidor:hover {
  transform: scale(1.01) translateY(-5px); /* Efecte subtil d'augmentar i pujar */
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.18);
}

.contenidor h2 {
  color: var(--secondary-color); /* Verd per al títol de la secció */
  font-size: 2.4rem; /* Més gran */
  font-weight: 700;
  text-align: center;
  margin-bottom: 1.8rem;
  position: relative;
  text-shadow: 1px 1px 2px rgba(0,0,0,0.05);
}

/* Línia decorativa sota el h2 */
.contenidor h2::after {
  content: '';
  display: block;
  width: 100px; /* Més ample */
  height: 4px; /* Més gruixut */
  background-color: var(--tertiary-color); /* Utilitza el taronja per la línia */
  margin: 0.8rem auto 0;
  border-radius: 3px;
}

.contenidor p {
  font-size: 1.1rem; /* Lleugerament més gran per llegibilitat */
  line-height: 1.8; /* Més espai entre línies */
  margin-bottom: 1.5em; /* Més espai entre paràgrafs */
  color: var(--light-text-color);
}

.contenidor p strong {
  color: var(--primary-color); /* Blau per a les paraules clau */
  font-weight: 700; /* Més èmfasi */
}

.contenidor p em {
  color: var(--dark-text-color); /* Verd per a l'èmfasi final */
  font-style: italic;
  font-weight: 600; /* Afegim una mica de pes */
}

.final-phrase {
  text-align: center;
  margin-top: 2.5rem;
  line-height: 1.4; /* Espaiat per a la frase final */
}

.animal-emojis {
  font-size: 2.5rem; /* Més gran per als emojis */
  display: block; /* Per posar-los en una línia separada */
  margin-bottom: 0.5rem;
}

.final-phrase em {
  font-size: 1.1rem; /* Mida de la lletra per al text d'agraïment */
  display: block;
  color: var(--secondary-color); /* Color verd d'èmfasi */
  font-weight: 600;
}

.imatge-rescatat {
  display: block; /* Per poder centrar amb margin */
  max-width: 350px; /* Més gran */
  width: 90%; /* Fes-la responsive dins del seu max-width */
  height: auto; /* Manté la proporció */
  margin: 3rem auto; /* Centra i afegeix més espai */
  border-radius: 50%; /* Forma circular, molt "xula" per a mascotes */
  border: 7px solid var(--tertiary-color); /* Vora més gruixuda i taronja */
  box-shadow: 0 8px 20px rgba(0,0,0,0.15); /* Ombra més pronunciada */
  transition: transform 0.4s ease, box-shadow 0.4s ease, border-color 0.4s ease;
  object-fit: cover; /* Assegura que la imatge ompli bé el cercle */
  aspect-ratio: 1 / 1; /* Manté proporció quadrada per al cercle */
  position: relative;
  z-index: 1;
}

.imatge-rescatat:hover {
  transform: rotate(3deg) scale(1.03); /* Lleugera rotació i augment */
  box-shadow: 0 12px 30px rgba(0,0,0,0.25);
  border-color: var(--primary-color); /* Canvia el color de la vora */
}

/* Adaptacions per a pantalles més petites */
@media (max-width: 768px) {
  h1 {
    font-size: 2.6rem;
  }
  .subtitle {
    font-size: 1.1rem;
    margin-bottom: 2rem;
  }
  .contenidor {
    padding: 2rem;
    margin: 1.5rem auto;
  }
  .contenidor h2 {
    font-size: 2rem;
  }
  .contenidor p {
    font-size: 1rem;
    line-height: 1.6;
  }
  .page-container {
    padding: 1.5rem 0.8rem;
  }
  .imatge-rescatat {
    max-width: 280px;
    margin: 2rem auto;
  }
  .animal-emojis {
    font-size: 2rem;
  }
}

@media (max-width: 480px) {
  h1 {
    font-size: 2rem;
  }
  .subtitle {
    font-size: 0.95rem;
  }
  .contenidor {
    padding: 1.5rem;
    margin: 1rem auto;
    border-radius: 10px;
  }
  .contenidor h2 {
    font-size: 1.7rem;
  }
  .contenidor p {
    font-size: 0.9rem;
  }
  .imatge-rescatat {
    max-width: 220px;
    border-width: 5px;
  }
  .animal-emojis {
    font-size: 1.8rem;
  }
}
</style>