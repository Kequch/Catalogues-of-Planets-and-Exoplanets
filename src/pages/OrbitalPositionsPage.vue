<template>
  <div class="container">
    <div class="flex-between page-header">
      <div>
        <h1>🛸 Орбитальные позиции</h1>
        <p>Все записи об орбитальных параметрах планет</p>
      </div>
      <button class="btn btn-accent" @click="openAddModal">+ Добавить</button>
    </div>

    <!-- Фильтр по планете (Лаб. №5 - выпадающий список) -->
    <div class="form-group" style="max-width: 300px;">
      <select class="form-control" v-model.number="filterPlanet">
        <option :value="0">Все планеты</option>
        <option v-for="planet in store.planets" :key="planet.id" :value="planet.id">
          {{ planet.name }}
        </option>
      </select>
    </div>

    <!-- Таблица (Лаб. №4 - v-for + v-if) -->
    <div v-if="filteredPositions.length > 0" style="overflow-x: auto;">
      <table class="data-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Планета</th>
            <th>Описание (параметры орбиты)</th>
            <th>Доступное кол-во</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="pos in filteredPositions" :key="pos.id">
            <td>{{ pos.id }}</td>
            <td>
              <router-link
                :to="`/planets/${pos.planetId}`"
                style="color: var(--color-primary-light); text-decoration: none;"
              >
                {{ getPlanetName(pos.planetId) }}
              </router-link>
            </td>
            <td style="max-width: 400px;">{{ pos.description }}</td>
            <td><span class="badge badge-accent">{{ pos.availableCount }}</span></td>
            <td>
              <div class="flex gap-1">
                <button class="btn btn-icon btn-outline btn-sm" @click="openEditModal(pos)">✏️</button>
                <button class="btn btn-icon btn-danger btn-sm" @click="confirmDelete(pos)">❌</button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="empty-state" v-else>
      <div class="icon">🛸</div>
      <p>Орбитальные позиции не найдены</p>
    </div>

    <!-- Модалка добавления/редактирования -->
    <div class="modal-overlay" v-if="showModal" @click.self="closeModal">
      <div class="modal-content">
        <h2>{{ editingPos ? 'Редактировать' : 'Добавить' }} орбитальную позицию</h2>

        <div class="form-group">
          <label>Планета *</label>
          <select class="form-control" v-model.number="form.planetId">
            <option :value="0" disabled>Выберите планету</option>
            <option v-for="planet in store.planets" :key="planet.id" :value="planet.id">
              {{ planet.name }}
            </option>
          </select>
        </div>

        <div class="form-group">
          <label>Описание (параметры орбиты) *</label>
          <textarea
            class="form-control"
            v-model.trim="form.description"
            placeholder="Расстояние от звезды, эксцентриситет, период обращения..."
            rows="3"
          ></textarea>
        </div>

        <div class="form-group">
          <label>Доступное количество *</label>
          <input
            type="number"
            class="form-control"
            v-model.number="form.availableCount"
            min="0"
          />
        </div>

        <div class="modal-actions">
          <button class="btn btn-outline" @click="closeModal">Отмена</button>
          <button
            class="btn btn-accent"
            @click="savePosition"
            :disabled="!form.description || !form.planetId"
          >
            {{ editingPos ? 'Сохранить' : 'Добавить' }}
          </button>
        </div>
      </div>
    </div>

    <!-- Диалог удаления -->
    <ConfirmDialog
      v-if="posToDelete"
      title="Удаление орбитальной позиции"
      :message="`Удалить орбитальную позицию #${posToDelete.id}?`"
      @confirm="deletePosition"
      @cancel="posToDelete = null"
    />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { store } from '../data/store.js'
import ConfirmDialog from '../components/ConfirmDialog.vue'

const filterPlanet = ref(0)
const showModal = ref(false)
const editingPos = ref(null)
const posToDelete = ref(null)

const form = ref({
  planetId: 0,
  description: '',
  availableCount: 1
})

const filteredPositions = computed(() => {
  if (!filterPlanet.value) return store.orbitalPositions
  return store.orbitalPositions.filter(op => op.planetId === filterPlanet.value)
})

function getPlanetName(id) {
  const planet = store.getPlanetById(id)
  return planet ? planet.name : 'Неизвестно'
}

function openAddModal() {
  editingPos.value = null
  form.value = { planetId: 0, description: '', availableCount: 1 }
  showModal.value = true
}

function openEditModal(pos) {
  editingPos.value = pos
  form.value = {
    planetId: pos.planetId,
    description: pos.description,
    availableCount: pos.availableCount
  }
  showModal.value = true
}

function closeModal() {
  showModal.value = false
  editingPos.value = null
}

function savePosition() {
  if (!form.value.description || !form.value.planetId) return

  if (editingPos.value) {
    store.updateOrbitalPosition(editingPos.value.id, { ...form.value })
  } else {
    store.addOrbitalPosition({ ...form.value })
  }
  console.log('Сохранена орбитальная позиция:', form.value)
  closeModal()
}

function confirmDelete(pos) {
  posToDelete.value = pos
}

function deletePosition() {
  store.deleteOrbitalPosition(posToDelete.value.id)
  posToDelete.value = null
}
</script>
