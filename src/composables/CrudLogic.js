// src/composables/CrudLogic.js
import { ref, onMounted, watch } from 'vue';

const LOCAL_STORAGE_KEY = 'dogsData';

/**
 * Composible per a la gestió de CRUD de gossos.
 * Proporciona l'estat reactiu dels gossos i les funcions per manipular-los.
 */
export function useDogsCrud() { // Canvi de nom de la funció d'exportació per ser més genèrica al context
    const dogs = ref([]);

    const saveDogsToLocalStorage = () => {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(dogs.value));
        console.log('Gossos guardats al localStorage.');
    };

    const loadDogsFromLocalStorage = () => {
        const storedDogs = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (storedDogs) {
            try {
                dogs.value = JSON.parse(storedDogs);
                console.log('Gossos carregats del localStorage:', dogs.value);
            } catch (e) {
                console.error("Error parsing dogs from localStorage:", e);
                dogs.value = [];
            }
        } else {
            console.log('No hi ha gossos guardats al localStorage.');
        }
    };

    const addDog = (newDogData) => {
        const id = Date.now();
        const dogWithId = { ...newDogData, id };
        dogs.value.push(dogWithId);
        console.log(`Gos "${dogWithId.name}" afegit.`, dogWithId);
    };

    const updateDog = (updatedDogData) => {
        const index = dogs.value.findIndex(d => d.id === updatedDogData.id);
        if (index !== -1) {
            dogs.value[index] = updatedDogData;
            console.log(`Gos "${updatedDogData.name}" actualitzat.`, updatedDogData);
        } else {
            console.warn(`No s'ha trobat el gos amb ID ${updatedDogData.id} per actualitzar.`);
        }
    };

    const deleteDog = (id) => {
        const initialLength = dogs.value.length;
        dogs.value = dogs.value.filter(dog => dog.id !== id);
        if (dogs.value.length < initialLength) {
            console.log(`Gos amb ID ${id} esborrat.`);
        } else {
            console.warn(`No s'ha trobat el gos amb ID ${id} per esborrar.`);
        }
    };

    onMounted(() => {
        loadDogsFromLocalStorage();
    });

    watch(dogs, () => {
        saveDogsToLocalStorage();
    }, { deep: true });

    return {
        dogs,
        addDog,
        updateDog,
        deleteDog,
    };
}