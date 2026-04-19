<template>
  <div class="container">
    <div v-if="planet">
      <!-- Кнопка возврата -->
      <button class="btn btn-outline mb-2" @click="$router.push('/planets')">← Назад к списку</button>

      <div class="page-header">
        <h1>🪐 {{ planet.name }}</h1>
        <p>Детальная информация о планете</p>
      </div>

      <div class="card mb-2" style="border-left: 4px solid var(--color-primary);">
        <div class="card-desc" style="font-size: 1.05rem; color: var(--color-text);">
          {{ planet.description }}
        </div>
        <div class="card-meta mt-2">
          <span class="badge badge-primary">ID: {{ planet.id }}</span>
          <span>⭐ {{ starSystemName }}</span>
          <span v-if="planet.discoveryDate">📅 Открыта: {{ planet.discoveryDate }}</span>
          <span v-else>📅 Известна с древности</span>
        </div>
      </div>

      <div class="flex-between mt-3 mb-2">
        <h2 style="color: var(--color-accent-light); font-family: 'Orbitron', sans-serif; font-size: 1.3rem;">
          🛸 Орбитальные позиции
        </h2>
        <button class="btn btn-accent btn-sm" @click="openAddOrbit">+ Добавить орбиту</button>
      </div>

      <div v-if="orbitalPositions.length > 0">
        <table class="data-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Описание (параметры орбиты)</th>
              <th>Доступное кол-во</th>
              <th>Действия</th>
            </tr>
          </thead>
          <tbody>

            <tr v-for="orbit in orbitalPositions" :key="orbit.id">
              <td>{{ orbit.id }}</td>
              <td>{{ orbit.description }}</td>
              <td>
                <span class="badge badge-accent">{{ orbit.availableCount }}</span>
              </td>
              <td>
                <div class="flex gap-1">
                  <button class="btn btn-icon btn-outline btn-sm" @click="openEditOrbit(orbit)">✏️</button>
                  <button class="btn btn-icon btn-danger btn-sm" @click="confirmDeleteOrbit(orbit)">❌</button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="empty-state" v-else>
        <div class="icon">🛸</div>
        <p>Орбитальные позиции не заданы. Добавьте первую!</p>
      </div>
    </div>

    <div class="empty-state" v-else>
      <div class="icon">❓</div>
      <p>Планета не найдена</p>
      <button class="btn btn-primary mt-2" @click="$router.push('/planets')">Вернуться к списку</button>
    </div>

    <div class="modal-overlay" v-if="showOrbitModal" @click.self="closeOrbitModal">
      <div class="modal-content">
        <h2>{{ editingOrbit ? 'Редактировать' : 'Добавить' }} орбитальную позицию</h2>

        <div class="form-group">
          <label>Описание (параметры орбиты) *</label>
          <textarea
            class="form-control"
            v-model.trim="orbitForm.description"
            placeholder="Расстояние от звезды, эксцентриситет, период обращения..."
            rows="3"
          ></textarea>
        </div>

        <div class="form-group">
          <label>Доступное количество *</label>
          <input
            type="number"
            class="form-control"
            v-model.number="orbitForm.availableCount"
            min="0"
            placeholder="0"
          />
        </div>

        <div class="modal-actions">
          <button class="btn btn-outline" @click="closeOrbitModal">Отмена</button>
          <button
            class="btn btn-accent"
            @click="saveOrbit"
            :disabled="!orbitForm.description"
          >
            {{ editingOrbit ? 'Сохранить' : 'Добавить' }}
          </button>
        </div>
      </div>
    </div>

    <ConfirmDialog
      v-if="orbitToDelete"
      title="Удаление орбитальной позиции"
      :message="`Удалить орбитальную позицию #${orbitToDelete.id}?`"
      @confirm="deleteOrbit"
      @cancel="orbitToDelete = null"
    />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { store } from '../data/store.js'
import ConfirmDialog from '../components/ConfirmDialog.vue'

const route = useRoute()
const planetId = computed(() => Number(route.params.id))

const planet = computed(() => store.getPlanetById(planetId.value))

const starSystemName = computed(() => {
  if (!planet.value) return ''
  const system = store.getStarSystemById(planet.value.starSystemId)
  return system ? system.name : 'Неизвестно'
})

const orbitalPositions = computed(() =>
  store.getOrbitalPositionsByPlanet(planetId.value)
)

// Модалка орбит
const showOrbitModal = ref(false)
const editingOrbit = ref(null)
const orbitToDelete = ref(null)

const orbitForm = ref({
  description: '',
  availableCount: 1
})

function openAddOrbit() {
  editingOrbit.value = null
  orbitForm.value = { description: '', availableCount: 1 }
  showOrbitModal.value = true
}

function openEditOrbit(orbit) {
  editingOrbit.value = orbit
  orbitForm.value = {
    description: orbit.description,
    availableCount: orbit.availableCount
  }
  showOrbitModal.value = true
}

function closeOrbitModal() {
  showOrbitModal.value = false
  editingOrbit.value = null
}

function saveOrbit() {
  if (!orbitForm.value.description) return

  if (editingOrbit.value) {
    store.updateOrbitalPosition(editingOrbit.value.id, {
      description: orbitForm.value.description,
      availableCount: orbitForm.value.availableCount
    })
  } else {
    store.addOrbitalPosition({
      description: orbitForm.value.description,
      planetId: planetId.value,
      availableCount: orbitForm.value.availableCount
    })
  }
  console.log('Сохранена орбитальная позиция:', orbitForm.value)
  closeOrbitModal()
}

function confirmDeleteOrbit(orbit) {
  orbitToDelete.value = orbit
}

function deleteOrbit() {
  store.deleteOrbitalPosition(orbitToDelete.value.id)
  orbitToDelete.value = null
}
</script>
