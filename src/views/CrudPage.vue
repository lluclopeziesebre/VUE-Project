<template>
  <div class="page-layout">
    <header class="text-center mb-10 fade-in-up">
      <h1 class="page-main-title">Gestió de Gossos</h1>
    </header>

    <div class="main-content-wrapper">
      <div class="form-container fade-in-up">
        <h2 class="form-title">Registrar Nou Gos</h2>
        <form @submit.prevent="submitDog">
          <div class="form-group">
            <label for="name">Nom:</label>
            <input
                type="text"
                id="name"
                v-model="newDog.name"
                required
                class="form-input"
            >
          </div>

          <div class="form-group">
            <label for="breed">Raça:</label>
            <input
                type="text"
                id="breed"
                v-model="newDog.breed"
                required
                class="form-input"
            >
          </div>

          <div class="form-group">
            <label for="age">Edat (anys):</label>
            <input
                type="number"
                id="age"
                v-model.number="newDog.age"
                min="0"
                class="form-input"
            >
          </div>

          <div class="form-group">
            <label for="gender">Sexe:</label>
            <select
                id="gender"
                v-model="newDog.gender"
                required
                class="form-input form-select"
            >
              <option value="">Selecciona...</option>
              <option value="Mascle">Mascle</option>
              <option value="Femella">Femella</option>
            </select>
          </div>

          <div class="form-group">
            <label for="color">Color:</label>
            <input
                type="text"
                id="color"
                v-model="newDog.color"
                class="form-input"
            >
          </div>

          <div class="form-group">
            <label for="chipUid">UID del Xip:</label>
            <input
                type="text"
                id="chipUid"
                v-model="newDog.chipUid"
                required
                class="form-input"
                pattern="[A-Za-z0-9]{5}"
                title="El UID del xip ha de tenir 5 caràcters alfanumèrics."
            >
            <p class="input-hint">Ex: 12345 (5 caràcters)</p>
          </div>

          <div class="form-actions">
            <button
                type="submit"
                class="submit-button"
            >
              Registrar Gos
            </button>
          </div>
        </form>
        <p v-if="message" :class="messageClass" class="form-message animated-shake">{{ message }}</p>
      </div>

      <hr class="separator">

      <div class="dog-list-container fade-in-up">
        <h2 class="list-title">Gossos Registrats</h2>

        <p v-if="dogs.length === 0" class="no-dogs-message">
          Encara no hi ha gossos registrats. Utilitza el formulari de dalt per afegir-ne un!
        </p>

        <ul class="dog-cards-grid">
          <li v-for="dog in dogs" :key="dog.id" class="dog-card">
            <div class="dog-info">
              <h3>{{ dog.name }} ({{ dog.breed }})</h3>
              <p><strong>Edat:</strong> {{ dog.age || 'N/A' }} anys</p>
              <p><strong>Sexe:</strong> {{ dog.gender }}</p>
              <p><strong>Color:</strong> {{ dog.color || 'N/A' }}</p>
              <p class="chip-uid"><strong>UID Xip:</strong> {{ dog.chipUid }}</p>
            </div>
            <div class="dog-actions">
              <button @click="startEditing(dog)" class="action-button edit-button">Editar</button>
              <button @click="confirmDelete(dog.id)" class="action-button delete-button">Esborrar</button>
            </div>
          </li>
        </ul>

        <div v-if="editingDog" class="edit-modal-overlay">
          <div class="edit-modal">
            <h3 class="edit-modal-title">Editar Gos: {{ editingDog.name }}</h3>
            <form @submit.prevent="saveDog">
              <div class="form-group">
                <label for="edit-name">Nom:</label>
                <input type="text" id="edit-name" v-model="editingDog.name" required class="form-input">
              </div>
              <div class="form-group">
                <label for="edit-breed">Raça:</label>
                <input type="text" id="edit-breed" v-model="editingDog.breed" required class="form-input">
              </div>
              <div class="form-group">
                <label for="edit-age">Edat (anys):</label>
                <input type="number" id="edit-age" v-model.number="editingDog.age" min="0" class="form-input">
              </div>
              <div class="form-group">
                <label for="edit-gender">Sexe:</label>
                <select id="edit-gender" v-model="editingDog.gender" required class="form-input form-select">
                  <option value="Mascle">Mascle</option>
                  <option value="Femella">Femella</option>
                </select>
              </div>
              <div class="form-group">
                <label for="edit-color">Color:</label>
                <input type="text" id="edit-color" v-model="editingDog.color" class="form-input">
              </div>
              <div class="form-group">
                <label for="edit-chipUid">UID del Xip:</label>
                <input
                    type="text"
                    id="edit-chipUid"
                    v-model="editingDog.chipUid"
                    required
                    class="form-input"
                    pattern="[A-Za-z0-9]{5}"
                    title="El UID del xip ha de tenir 5 caràcters alfanumèrics."
                >
                <p class="input-hint">Ex: 12345 (5 caràcters)</p>
              </div>

              <div class="edit-modal-actions">
                <button type="submit" class="submit-button save-button">Guardar Canvis</button>
                <button type="button" @click="cancelEditing" class="cancel-button">Cancel·lar</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useDogsCrud } from '../composables/CrudLogic';

const { dogs, addDog, updateDog, deleteDog } = useDogsCrud();

const newDog = ref({
  name: '',
  breed: '',
  age: null,
  gender: '',
  color: '',
  chipUid: ''
});

const message = ref('');
const messageClass = ref('');

const submitDog = () => {
  if (!newDog.value.name || !newDog.value.breed || !newDog.value.gender || !newDog.value.chipUid) {
    message.value = 'Si us plau, omple tots els camps obligatoris.';
    messageClass.value = 'message-error';
    return;
  }
  if (!/^[A-Za-z0-9]{5}$/.test(newDog.value.chipUid)) {
    message.value = 'El UID del xip ha de tenir exactament 5 caràcters alfanumèrics.';
    messageClass.value = 'message-error';
    return;
  }

  addDog({ ...newDog.value });

  message.value = `Gos "${newDog.value.name}" registrat amb èxit!`;
  messageClass.value = 'message-success';

  newDog.value = {
    name: '',
    breed: '',
    age: null,
    gender: '',
    color: '',
    chipUid: ''
  };
};

const editingDog = ref(null);

const startEditing = (dog) => {
  editingDog.value = { ...dog };
};

const saveDog = () => {
  if (!editingDog.value.name || !editingDog.value.breed || !editingDog.value.gender || !editingDog.value.chipUid) {
    alert('Si us plau, omple tots els camps obligatoris.');
    return;
  }
  if (!/^[A-Za-z0-9]{5}$/.test(editingDog.value.chipUid)) {
    alert('El UID del xip ha de tenir exactament 5 caràcters alfanumèrics.');
    return;
  }

  updateDog(editingDog.value);
  editingDog.value = null;
};

const cancelEditing = () => {
  editingDog.value = null;
};

const confirmDelete = (id) => {
  if (confirm('Estàs segur que vols esborrar aquest gos? Aquesta acció no es pot desfer.')) {
    deleteDog(id);
  }
};
</script>

<style scoped>
/* Importa la font de Google Fonts */
@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800&display=swap');

/* Estils globals per a la pàgina */
.page-layout {
  padding: 2rem 1rem;
  background-color: #ffffff; /* Fons blanc pur */
  min-height: 100vh;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: 'Nunito', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  color: #333; /* Color de text general */
}

/* Animaciones */
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

.page-main-title {
  font-size: 3rem;
  font-weight: 800;
  color: #2c3e50; /* Color gris fosc/negre */
  text-align: center;
  margin-bottom: 2.5rem;
  padding: 1rem 0;
  /* Eliminat el degradat, només text pla fosc */
  text-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
  width: 100%;
  max-width: 1200px;
  letter-spacing: -0.025em;
}

/* Contenidor principal del contingut - Unifica l'ample màxim */
.main-content-wrapper {
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
  padding: 0 1rem;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 3rem;
}

.separator {
  border: 0;
  height: 1px;
  background-image: linear-gradient(to right, rgba(0, 0, 0, 0), rgba(142, 45, 226, 0.75), rgba(0, 0, 0, 0)); /* Lila #8e2de2 */
  margin: 2rem auto;
  width: 100%;
  max-width: 700px;
}

/* Estils del Formulari (Registrar Nou Gos) */
.form-container {
  max-width: 500px;
  width: 100%;
  margin: 0 auto;
  padding: 2rem;
  background-color: #ffffff;
  border-radius: 1rem;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
  border: 1px solid #f0f0f0;
  box-sizing: border-box;
}

.form-title {
  font-size: 2.25rem;
  font-weight: 700;
  color: #2c3e50; /* Color gris fosc/negre */
  margin-bottom: 2rem;
  text-align: center;
  position: relative;
  padding-bottom: 0.75rem;
}

.form-title::after {
  content: '';
  position: absolute;
  left: 50%;
  bottom: 0;
  transform: translateX(-50%);
  width: 4rem;
  height: 0.25rem;
  background-color: #8e2de2; /* Lila #8e2de2 */
  border-radius: 0.125rem;
}

.form-group {
  margin-bottom: 1.25rem;
}

.form-group label {
  display: block;
  font-size: 0.95rem;
  color: #555;
  margin-bottom: 0.5rem;
  font-weight: 600;
}

.form-input {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid #e0e0e0;
  border-radius: 0.5rem;
  font-size: 1rem;
  color: #333;
  transition: all 0.3s ease;
  box-sizing: border-box;
}

.form-input:focus {
  outline: none;
  border-color: #8e2de2; /* Lila #8e2de2 */
  box-shadow: 0 0 0 3px rgba(142, 45, 226, 0.2); /* Sombra de enfoque lila */
}

.form-select {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236B7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 0.75rem center;
  background-size: 1.25em 1.25em;
  padding-right: 2.75rem;
}

.input-hint {
  font-size: 0.8em;
  color: #777;
  margin-top: 0.3rem;
  text-align: right;
}

.form-actions {
  text-align: center;
  margin-top: 2rem;
}

.submit-button {
  background: linear-gradient(to right, #6a1bb2, #8e2de2); /* Lila #8e2de2 */
  color: #ffffff;
  padding: 0.875rem 1.75rem;
  border: none;
  border-radius: 1.5rem;
  font-size: 1.05rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.submit-button:hover {
  background: linear-gradient(to right, #8e2de2, #6a1bb2); /* Invertir degradado al hover */
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
}

.submit-button:active {
  transform: translateY(-1px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.form-message {
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  margin-top: 1.25rem;
  font-weight: 500;
  text-align: center;
  /* Animación para el mensaje */
  animation: fadeIn 0.5s ease-out;
}

.message-success {
  background-color: #d1fae5;
  color: #065f46;
  border: 1px solid #34d399;
}

.message-error {
  background-color: #fee2e2;
  color: #991b1b;
  border: 1px solid #ef4444;
}

/* Estils de la llista de gossos (Read, Update, Delete) */
.dog-list-container {
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem;
  background-color: #ffffff;
  border-radius: 1rem;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
  border: 1px solid #f0f0f0;
  box-sizing: border-box;
}

.list-title {
  font-size: 2.25rem;
  font-weight: 700;
  color: #2c3e50; /* Color gris fosc/negre */
  margin-bottom: 2rem;
  text-align: center;
  position: relative;
  padding-bottom: 0.75rem;
}

.list-title::after {
  content: '';
  position: absolute;
  left: 50%;
  bottom: 0;
  transform: translateX(-50%);
  width: 5rem;
  height: 0.25rem;
  background-color: #8e2de2; /* Lila #8e2de2 */
  border-radius: 0.125rem;
}

.no-dogs-message {
  text-align: center;
  font-size: 1.1em;
  color: #777;
  padding: 1.5rem;
  border: 1px dashed #ccc;
  border-radius: 0.5rem;
  margin-bottom: 1.5rem;
  width: 100%;
  box-sizing: border-box;
}

.dog-cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
  list-style: none;
  padding: 0;
  margin: 0;
}

.dog-card {
  background-color: #ffffff;
  border-radius: 0.75rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
  border: 1px solid #f0f0f0;
}

.dog-card:hover {
  transform: translateY(-0.25rem);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.12);
}

.dog-info {
  padding: 1.25rem;
  flex-grow: 1;
}

.dog-info h3 {
  font-size: 1.35rem;
  color: #2c3e50; /* Color gris fosc/negre */
  margin-bottom: 0.625rem;
  font-weight: 700;
}

.dog-info p {
  font-size: 0.95rem;
  color: #666;
  margin-bottom: 0.3rem;
  line-height: 1.4;
}

.dog-info p strong {
  color: #333;
  font-weight: 600;
}

.dog-info .chip-uid {
  font-size: 0.85rem;
  color: #888;
  margin-top: 1rem;
  border-top: 1px dashed #eee;
  padding-top: 0.625rem;
}

.dog-actions {
  display: flex;
  justify-content: center;
  gap: 0.75rem;
  padding: 1rem 1.25rem;
  background-color: #f8f8f8;
  border-top: 1px solid #f0f0f0;
}

.action-button {
  padding: 0.625rem 1.125rem;
  border: none;
  border-radius: 1.25rem;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.edit-button {
  background: linear-gradient(to right, #6a1bb2, #8e2de2); /* Lila #8e2de2 */
  color: white;
}

.edit-button:hover {
  background: linear-gradient(to right, #8e2de2, #6a1bb2);
  transform: scale(1.03);
}

.delete-button {
  background: linear-gradient(to right, #ef4444, #dc2626);
  color: white;
}

.delete-button:hover {
  background: linear-gradient(to right, #dc2626, #ef4444);
  transform: scale(1.03);
}

/* --- Estils del Modal d'Edició --- */
.edit-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  animation: fadeInOverlay 0.3s ease-out;
}

.edit-modal {
  background-color: #ffffff;
  padding: 2.5rem;
  border-radius: 1rem;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15);
  width: 90%;
  max-width: 550px;
  animation: slideInFromTop 0.4s ease-out;
  position: relative;
  border: 1px solid #f0f0f0;
}

.edit-modal-title {
  font-size: 2rem;
  font-weight: 700;
  color: #2c3e50; /* Color gris fosc/negre */
  margin-bottom: 1.5rem;
  text-align: center;
}

.edit-modal-actions {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 2rem;
}

.save-button {
  background: linear-gradient(to right, #6a1bb2, #8e2de2); /* Lila #8e2de2 */
  color: white;
  padding: 0.875rem 1.75rem;
  border: none;
  border-radius: 1.5rem;
  font-size: 1.05rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.save-button:hover {
  background: linear-gradient(to right, #8e2de2, #6a1bb2);
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
}

.cancel-button {
  background-color: #e0e0e0;
  color: #555;
  padding: 0.875rem 1.75rem;
  border: none;
  border-radius: 1.5rem;
  font-size: 1.05rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.cancel-button:hover {
  background-color: #d0d0d0;
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.12);
}

/* Reutilització d'estils del formulari dins del modal */
.edit-modal .form-group {
  margin-bottom: 1rem;
}
.edit-modal .form-group label {
  font-size: 0.9rem;
  margin-bottom: 0.4rem;
}
.edit-modal .form-input {
  padding: 0.625rem 0.875rem;
  font-size: 0.95rem;
}
.edit-modal .form-input:focus {
  border-color: #8e2de2; /* Lila #8e2de2 */
  box-shadow: 0 0 0 3px rgba(142, 45, 226, 0.2);
}

/* Responsive adjustments */
@media (max-width: 950px) {
  .main-content-wrapper {
    padding: 0 1rem;
  }
}

@media (max-width: 768px) {
  .form-container, .dog-list-container {
    margin-left: auto;
    margin-right: auto;
    padding: 1.5rem;
  }
  .list-title {
    font-size: 1.8rem;
  }
  .dog-cards-grid {
    grid-template-columns: 1fr;
  }
  .edit-modal {
    padding: 1.5rem;
  }
  .page-main-title {
    font-size: 2.2rem;
    margin-bottom: 1.5rem;
  }
}
@media (max-width: 480px) {
  .page-main-title {
    font-size: 1.8rem;
    padding: 1rem 0;
  }
  .form-title, .list-title {
    font-size: 1.6rem;
  }
  .form-container, .dog-list-container {
    padding: 1rem;
  }
  .submit-button, .action-button, .save-button, .cancel-button {
    font-size: 0.85rem;
    padding: 0.625rem 1rem;
  }
}

</style>