<template>
  <div class="container mx-auto p-4 sm:p-8 antialiased">
    <header class="text-center mb-10 fade-in-up">
      <h1 class="text-4xl sm:text-5xl font-extrabold text-blue-800 tracking-tight">¡Amants dels Gossets!</h1>
      <p class="subtitle">Descobreix imatges adorables de gossets que pots trobar en RescuePets, ¡cada imatge és una joia!</p>
    </header>
    <div class="max-w-2xl mx-auto bg-white p-6 sm:p-8 rounded-2xl shadow-3xl border border-gray-100 transform transition-transform duration-300 hover:scale-[1.005] hover:shadow-4xl">

      <div class="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <button
            @click="fetchRandomDogImage"
            :disabled="loadingImage"
            class="w-full sm:w-auto bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold py-3 px-6 rounded-xl transition-all duration-200 ease-in-out transform hover:-translate-y-0.5 focus:outline-none focus:ring-4 focus:ring-blue-300 focus:ring-opacity-75 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          <svg v-if="loadingImage && currentAction === 'random'" class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
          <span v-else>🐶 Nou gosset aleatori</span>
        </button>

        <div class="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-3 w-full sm:w-auto">
          <select
              v-model="selectedBreed"
              :disabled="loadingBreeds || breeds.length === 0"
              class="w-full sm:w-auto custom-select block appearance-none bg-gray-50 border border-gray-200 text-gray-700 py-3 px-4 pr-10 rounded-xl leading-tight focus:outline-none focus:bg-white focus:border-blue-400 focus:ring-2 focus:ring-blue-200 transition-all duration-200 ease-in-out disabled:opacity-60 disabled:cursor-not-allowed"
          >
            <option disabled value="">
              <span v-if="loadingBreeds">Carregant raçes...</span>
              <span v-else-if="breeds.length === 0 && !errorBreeds">No hi ha races disponibles</span>
              <span v-else-if="errorBreeds">Error al carregar raçes</span>
              <span v-else>Escull una raça</span>
            </option>
            <option v-for="breed in breeds" :key="breed" :value="breed">
              {{ capitalizeFirstLetter(breed.replace('/', ' - ')) }}
            </option>
          </select>
          <button
              @click="fetchDogImageByBreed"
              :disabled="!selectedBreed || loadingImage"
              class="w-full sm:w-auto bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-3 px-4 rounded-xl transition-all duration-200 ease-in-out transform hover:-translate-y-0.5 focus:outline-none focus:ring-4 focus:ring-green-300 focus:ring-opacity-75 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            <svg v-if="loadingImage && currentAction === 'breed'" class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
            <span v-else>🐕 Veure raça</span>
          </button>
        </div>
      </div>

      <div v-if="errorImage" class="mb-6 bg-red-50 border-l-4 border-red-400 text-red-800 p-4 rounded-lg animated-shake" role="alert">
        <p class="font-bold text-lg mb-1">¡Oops! Hi ha hagut un problema...</p>
        <p class="text-sm">{{ errorImage }}</p>
      </div>
      <div v-if="errorBreeds && !breeds.length" class="mb-6 bg-red-50 border-l-4 border-red-400 text-red-800 p-4 rounded-lg animated-shake" role="alert">
        <p class="font-bold text-lg mb-1">Error al carregar races:</p>
        <p class="text-sm">{{ errorBreeds }}</p>
      </div>


      <div class="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-xl bg-gray-100 shadow-inner flex items-center justify-center border border-gray-200">
        <div v-if="loadingImage" class="flex flex-col items-center justify-center w-full h-full text-blue-500">
          <svg class="animate-spin h-16 w-16 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p class="text-lg font-medium">Carregant gosset...</p>
        </div>
        <img
            v-else-if="imageUrl && !errorImage"
            :src="imageUrl"
            alt="Un perro adorable"
            class="object-cover object-center w-full h-full transition-opacity duration-500 ease-in-out opacity-0"
            @load="onImageLoad"
            :class="{'opacity-100': !loadingImage && imageUrl}"
        />
        <div v-else-if="!loadingImage && !imageUrl && !errorImage" class="flex flex-col items-center justify-center h-full text-gray-500 p-4 text-center">
          <svg class="w-20 h-20 mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.86-1.503A2 2 0 0110.373 4H13.63a2 2 0 011.664.89l.86 1.503A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
          <p class="text-xl font-semibold">Selecciona una opció per veure un gosset.</p>
          <p class="text-sm mt-2">Fes clic en "Nou gosset aleatori" o tria una raça.</p>
        </div>
      </div>

      <p v-if="currentDogBreed && !loadingImage && !errorImage" class="text-center text-xl sm:text-2xl font-bold text-blue-700 mt-6 tracking-wide">
        <span class="text-gray-700">Raça:</span> <span class="text-blue-800">{{ currentDogBreed }}</span>
      </p>

      <p v-if="imageUrl && !loadingImage && !errorImage" class="text-center text-xs text-gray-500 mt-4 italic">
        Imatges proporcionades per <a href="https://dog.ceo/dog-api/" target="_blank" class="underline hover:text-blue-600 font-medium">Dog CEO API</a>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const imageUrl = ref('');
const breeds = ref([]);
const selectedBreed = ref('');
const currentDogBreed = ref('');

const loadingImage = ref(false);
const loadingBreeds = ref(false);
const errorImage = ref(null);
const errorBreeds = ref(null);
const currentAction = ref('');

// API Endpoints
const RANDOM_IMAGE_URL = 'https://dog.ceo/api/breeds/image/random';
const ALL_BREEDS_URL = 'https://dog.ceo/api/breeds/list/all';
const BREED_IMAGE_URL_PREFIX = 'https://dog.ceo/api/breed/';

// --- Funciones para obtener datos ---

async function fetchApi(url, loadingSignal, errorSignal, actionName = '') {
  if (loadingSignal) loadingSignal.value = true;
  if (errorSignal) errorSignal.value = null;
  if (actionName) currentAction.value = actionName;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: response.statusText }));
      throw new Error(`Error ${response.status}: ${errorData.message || response.statusText}`);
    }
    const data = await response.json();
    if (data.status !== 'success') {
      throw new Error(data.message || 'La API no devolvió un estado exitoso.');
    }
    return data.message;
  } catch (e) {
    console.error(`Error fetching ${url}:`, e);
    if (errorSignal) errorSignal.value = e.message;
    return null;
  } finally {
    if (loadingSignal) loadingSignal.value = false;
    if (actionName) currentAction.value = '';
  }
}

// Funció auxiliar per extreure la raça de la URL de la imatge
function extractBreedFromImageUrl(url) {
  if (!url) return '';
  const parts = url.split('/');
  const breedsIndex = parts.indexOf('breeds');
  if (breedsIndex !== -1 && parts.length > breedsIndex + 1) {
    let breed = parts[breedsIndex + 1];
    if (parts.length > breedsIndex + 2 && !parts[breedsIndex + 2].includes('.')) {
      let subBreed = parts[breedsIndex + 2];
      return capitalizeFirstLetter(subBreed.replace(/-/g, ' ')) + ' ' + capitalizeFirstLetter(breed.replace(/-/g, ' '));
    }
    return capitalizeFirstLetter(breed.replace(/-/g, ' '));
  }
  return '';
}

async function fetchRandomDogImage() {
  const newImageUrl = await fetchApi(RANDOM_IMAGE_URL, loadingImage, errorImage, 'random');
  if (newImageUrl) {
    imageUrl.value = newImageUrl;
    currentDogBreed.value = extractBreedFromImageUrl(newImageUrl);
  } else {
    currentDogBreed.value = '';
  }
}

async function fetchAllBreeds() {
  const breedsData = await fetchApi(ALL_BREEDS_URL, loadingBreeds, errorBreeds);
  if (breedsData) {
    const breedsList = [];
    for (const breed in breedsData) {
      if (breedsData[breed].length === 0) {
        breedsList.push(breed);
      } else {
        breedsData[breed].forEach(subBreed => {
          breedsList.push(`${breed}/${subBreed}`);
        });
      }
    }
    breeds.value = breedsList.sort();
  }
}

async function fetchDogImageByBreed() {
  if (!selectedBreed.value) return;
  const url = `${BREED_IMAGE_URL_PREFIX}${selectedBreed.value}/images/random`;
  const newImageUrl = await fetchApi(url, loadingImage, errorImage, 'breed');
  if (newImageUrl) {
    imageUrl.value = newImageUrl;
    currentDogBreed.value = extractBreedFromImageUrl(newImageUrl);
  } else {
    currentDogBreed.value = '';
  }
}

// Function to handle image load for transition effect
function onImageLoad(event) {
  event.target.classList.remove('opacity-0');
  event.target.classList.add('opacity-100');
}

// --- Utilidades ---
function capitalizeFirstLetter(string) {
  if (!string) return '';
  return string.charAt(0).toUpperCase() + string.slice(1);
}

// --- Hook del ciclo de vida ---
onMounted(async () => {
  await fetchAllBreeds();
  await fetchRandomDogImage();
});
</script>

<style scoped>
/* Importa la font de Google Fonts */
@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&display=swap');


/* Custom Select Arrow Styling */
.custom-select {
  -webkit-appearance: none; /* Desactiva la flecha nativa en navegadores WebKit (Chrome, Safari) */
  -moz-appearance: none;    /* Desactiva la flecha nativa en navegadores Gecko (Firefox) */
  appearance: none;         /* Desactiva la flecha nativa estándar */
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236B7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e");
  background-position: right 0.75rem center;
  background-repeat: no-repeat;
  background-size: 1.25em 1.25em;
  padding-right: 2.75rem; /* Asegura espacio para la flecha personalizada */
}

/* Enhancements for image container aspect ratio - Tailwind JIT often handles this */
/* Keeping these for broader compatibility if JIT is not fully configured */
.aspect-w-1 { --tw-aspect-w: 1; }
.aspect-h-1 { --tw-aspect-h: 1; }
@supports (aspect-ratio: 1 / 1) {
  .aspect-w-1 { --tw-aspect-w: auto; }
  .aspect-h-1 { --tw-aspect-h: auto; }
  .aspect-w-1.aspect-h-1 { aspect-ratio: 1 / 1; }
}

.subtitle {
  text-align: center;
  font-size: 1.25rem; /* Més gran i llegible */
  color: var(--dark-text-color); /* Color més fosc per a major contrast */
  margin-bottom: 3rem; /* Més espai abans del contenidor */
  max-width: 600px;
}

/* Deeper shadows for a more premium feel */
.shadow-2xl {
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}
.shadow-3xl {
  box-shadow: 0 35px 60px -15px rgba(0, 0, 0, 0.15), 0 20px 30px -10px rgba(0, 0, 0, 0.08);
}
.shadow-4xl {
  box-shadow: 0 45px 80px -20px rgba(0, 0, 0, 0.2), 0 25px 40px -15px rgba(0, 0, 0, 0.1);
}

/* Animations */
@keyframes fadeInDown {
  from { opacity: 0; transform: translateY(-20px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
  20%, 40%, 60%, 80% { transform: translateX(5px); }
}

.fade-in-up {
  animation: fadeInUp 0.8s ease-out forwards;
}

.animated-shake {
  animation: shake 0.5s ease-in-out;
}

/* General body/container background */
.container {
  background-color: #ffffff; /* Fondo blanco puro */
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 2rem;
  padding-bottom: 2rem;
  /* Aplica la fuente Nunito */
  font-family: 'Nunito', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
}

/* Adjust header spacing for better visual flow */
header {
  margin-bottom: 3rem;
}

</style>