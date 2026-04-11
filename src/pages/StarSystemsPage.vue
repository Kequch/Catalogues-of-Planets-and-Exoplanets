<template>
  <div class="container">
    <div class="flex-between page-header">
      <div>
        <h1>⭐ Звёздные системы</h1>
        <p>Управление каталогом звёздных систем</p>
      </div>
      <button class="btn btn-primary" @click="openAddModal">+ Добавить</button>
    </div>

    <!-- Поиск (Лаб. №3 - v-model + интерполяция) -->
    <div class="form-group" style="max-width: 400px;">
      <input
        type="text"
        class="form-control"
        placeholder="🔍 Поиск по названию..."
        v-model.trim="searchQuery"
      />
    </div>

    <!-- Список звёздных систем (Лаб. №4 - v-for директива) -->
    <div class="card-grid" v-if="filteredSystems.length > 0">
      <div
        v-for="system in filteredSystems"
        :key="system.id"
        class="card"
      >
        <div class="flex-between">
          <div class="card-title">{{ system.name }}</div>
          <div class="flex gap-1">
            <!-- Кнопка переименования (Лаб. №2 - ✏ переименование) -->
            <button class="btn btn-icon btn-outline" @click.stop="openEditModal(system)" title="Редактировать">
              ✏️
            </button>
            <!-- Кнопка удаления (Лаб. №2 - ❌ удаление) -->
            <button class="btn btn-icon btn-danger" @click.stop="confirmDelete(system)" title="Удалить">
              ❌
            </button>
          </div>
        </div>
        <div class="card-desc">{{ system.description }}</div>
        <div class="card-meta">
          <span class="badge badge-primary">ID: {{ system.id }}</span>
          <span class="badge badge-accent">
            🪐 {{ getPlanetCount(system.id) }} {{ pluralize(getPlanetCount(system.id), 'планета', 'планеты', 'планет') }}
          </span>
        </div>
      </div>
    </div>

    <!-- Пустое состояние (Лаб. №4 - v-if для условного рендеринга) -->
    <div class="empty-state" v-else>
      <div class="icon">🌌</div>
      <p v-if="searchQuery">По запросу «{{ searchQuery }}» ничего не найдено</p>
      <p v-else>Звёздные системы не добавлены. Нажмите «+ Добавить» для создания.</p>
    </div>

    <!-- Модальное окно добавления/редактирования -->
    <div class="modal-overlay" v-if="showModal" @click.self="closeModal">
      <div class="modal-content">
        <h2>{{ editingSystem ? 'Редактировать' : 'Добавить' }} звёздную систему</h2>

        <!-- Форма (Лаб. №3 - v-model привязка полей) -->
        <div class="form-group">
          <label>Наименование *</label>
          <input
            type="text"
            class="form-control"
            v-model.trim="form.name"
            placeholder="Введите название"
          />
        </div>

        <div class="form-group">
          <label>Описание</label>
          <textarea
            class="form-control"
            v-model.trim="form.description"
            placeholder="Описание звёздной системы"
            rows="4"
          ></textarea>
        </div>

        <div class="modal-actions">
          <button class="btn btn-outline" @click="closeModal">Отмена</button>
          <!-- Кнопка заблокирована если имя пустое (Лаб. №3 - :disabled) -->
          <button
            class="btn btn-primary"
            @click="saveSystem"
            :disabled="!form.name"
          >
            {{ editingSystem ? 'Сохранить' : 'Добавить' }}
          </button>
        </div>
      </div>
    </div>

    <!-- Диалог подтверждения удаления -->
    <ConfirmDialog
      v-if="systemToDelete"
      title="Удаление звёздной системы"
      :message="`Удалить систему «${systemToDelete.name}» и все связанные планеты?`"
      @confirm="deleteSystem"
      @cancel="systemToDelete = null"
    />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { store } from '../data/store.js'
import ConfirmDialog from '../components/ConfirmDialog.vue'

// Реактивные переменные (Лаб. №3, №4)
const searchQuery = ref('')
const showModal = ref(false)
const editingSystem = ref(null)
const systemToDelete = ref(null)

const form = ref({
  name: '',
  description: ''
})

// Computed - фильтрация (Лаб. №4)
const filteredSystems = computed(() => {
  if (!searchQuery.value) return store.starSystems
  const q = searchQuery.value.toLowerCase()
  return store.starSystems.filter(s =>
    s.name.toLowerCase().includes(q) ||
    s.description.toLowerCase().includes(q)
  )
})

function getPlanetCount(systemId) {
  return store.planets.filter(p => p.starSystemId === systemId).length
}

function pluralize(count, one, few, many) {
  const n = Math.abs(count) % 100
  const n1 = n % 10
  if (n > 10 && n < 20) return many
  if (n1 > 1 && n1 < 5) return few
  if (n1 === 1) return one
  return many
}

function openAddModal() {
  editingSystem.value = null
  form.value = { name: '', description: '' }
  showModal.value = true
}

// Редактирование (Лаб. №2 - переименование элемента)
function openEditModal(system) {
  editingSystem.value = system
  form.value = { name: system.name, description: system.description }
  showModal.value = true
}

function closeModal() {
  showModal.value = false
  editingSystem.value = null
}

function saveSystem() {
  if (!form.value.name) return

  if (editingSystem.value) {
    store.updateStarSystem(editingSystem.value.id, {
      name: form.value.name,
      description: form.value.description
    })
  } else {
    store.addStarSystem({
      name: form.value.name,
      description: form.value.description
    })
  }
  // Логирование в консоль (Лаб. №3 - пункт 7)
  console.log('Сохранена звёздная система:', form.value)
  closeModal()
}

function confirmDelete(system) {
  systemToDelete.value = system
}

// Удаление (Лаб. №2 - удаление из массива)
function deleteSystem() {
  store.deleteStarSystem(systemToDelete.value.id)
  systemToDelete.value = null
}
</script>
