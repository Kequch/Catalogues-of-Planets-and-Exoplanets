<template>
  <div class="container">
    <div class="flex-between page-header">
      <div>
        <h1>🪐 Каталог планет</h1>
        <p>Управление планетами и экзопланетами</p>
      </div>
      <button class="btn btn-primary" @click="openAddModal">+ Добавить</button>
    </div>

    <!-- Фильтры (Лаб. №3 - v-model, Лаб. №5 - выпадающий список категорий) -->
    <div class="flex gap-2 mb-2" style="flex-wrap: wrap;">
      <div class="form-group" style="flex: 1; min-width: 200px;">
        <input
          type="text"
          class="form-control"
          placeholder="🔍 Поиск по названию..."
          v-model.trim="searchQuery"
        />
      </div>
      <div class="form-group" style="min-width: 200px;">
        <select class="form-control" v-model.number="filterSystem">
          <option :value="0">Все звёздные системы</option>
          <option
            v-for="system in store.starSystems"
            :key="system.id"
            :value="system.id"
          >
            {{ system.name }}
          </option>
        </select>
      </div>
    </div>

    <!--
      Компонент PlanetList (Лаб. №6 - EmojiList + selectEmoji).
      Передаём массив планет, обрабатываем события.
    -->
    <PlanetList
      :planets="filteredPlanets"
      emptyMessage="Планеты не найдены. Добавьте первую планету!"
      @selectPlanet="goToPlanet"
      @edit="openEditModal"
      @delete="confirmDelete"
    />

    <!-- Модальное окно добавления/редактирования планеты -->
    <div class="modal-overlay" v-if="showModal" @click.self="closeModal">
      <div class="modal-content">
        <h2>{{ editingPlanet ? 'Редактировать' : 'Добавить' }} планету</h2>

        <!-- Форма (Лаб. №3 - привязка полей v-model) -->
        <div class="form-group">
          <label>Наименование *</label>
          <input type="text" class="form-control" v-model.trim="form.name" placeholder="Название планеты" />
        </div>

        <div class="form-group">
          <label>Описание</label>
          <textarea class="form-control" v-model.trim="form.description" placeholder="Детальная информация" rows="3"></textarea>
        </div>

        <div class="form-group">
          <label>Звёздная система *</label>
          <select class="form-control" v-model.number="form.starSystemId">
            <option :value="0" disabled>Выберите звёздную систему</option>
            <option
              v-for="system in store.starSystems"
              :key="system.id"
              :value="system.id"
            >
              {{ system.name }}
            </option>
          </select>
        </div>

        <div class="form-group">
          <label>Дата открытия</label>
          <input type="date" class="form-control" v-model="form.discoveryDate" />
        </div>

        <div class="modal-actions">
          <button class="btn btn-outline" @click="closeModal">Отмена</button>
          <button
            class="btn btn-primary"
            @click="savePlanet"
            :disabled="!form.name || !form.starSystemId"
          >
            {{ editingPlanet ? 'Сохранить' : 'Добавить' }}
          </button>
        </div>
      </div>
    </div>

    <!-- Диалог удаления -->
    <ConfirmDialog
      v-if="planetToDelete"
      title="Удаление планеты"
      :message="`Удалить планету «${planetToDelete.name}» и все связанные орбитальные позиции?`"
      @confirm="deletePlanet"
      @cancel="planetToDelete = null"
    />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { store } from '../data/store.js'
import PlanetList from '../components/PlanetList.vue'
import ConfirmDialog from '../components/ConfirmDialog.vue'

const router = useRouter()

const searchQuery = ref('')
const filterSystem = ref(0)
const showModal = ref(false)
const editingPlanet = ref(null)
const planetToDelete = ref(null)

const form = ref({
  name: '',
  description: '',
  starSystemId: 0,
  discoveryDate: ''
})

// Computed - фильтрация планет (Лаб. №4)
const filteredPlanets = computed(() => {
  let result = store.planets

  if (filterSystem.value) {
    result = result.filter(p => p.starSystemId === filterSystem.value)
  }

  if (searchQuery.value) {
    const q = searchQuery.value.toLowerCase()
    result = result.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q)
    )
  }

  return result
})

function goToPlanet(planet) {
  router.push(`/planets/${planet.id}`)
}

function openAddModal() {
  editingPlanet.value = null
  form.value = { name: '', description: '', starSystemId: 0, discoveryDate: '' }
  showModal.value = true
}

function openEditModal(planet) {
  editingPlanet.value = planet
  form.value = {
    name: planet.name,
    description: planet.description,
    starSystemId: planet.starSystemId,
    discoveryDate: planet.discoveryDate
  }
  showModal.value = true
}

function closeModal() {
  showModal.value = false
  editingPlanet.value = null
}

function savePlanet() {
  if (!form.value.name || !form.value.starSystemId) return

  if (editingPlanet.value) {
    store.updatePlanet(editingPlanet.value.id, { ...form.value })
  } else {
    store.addPlanet({ ...form.value })
  }
  // Лаб. №3, п.7 - вывод в консоль
  console.log('Сохранена планета:', form.value)
  closeModal()
}

function confirmDelete(planet) {
  planetToDelete.value = planet
}

// Лаб. №2 - удаление из массива
function deletePlanet() {
  store.deletePlanet(planetToDelete.value.id)
  planetToDelete.value = null
}
</script>
