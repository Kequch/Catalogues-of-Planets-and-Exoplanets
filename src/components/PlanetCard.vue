<template>
  <!--
    Компонент карточки планеты.
    Аналог Лаб. №6 - компонент Emoji с defineProps.
    Принимает объект планеты как входной параметр.
  -->
  <div class="card" style="cursor: pointer;">
    <div class="flex-between">
      <div class="card-title">{{ planet.name }}</div>
      <div class="flex gap-1">
        <!-- Кнопки действий (Лаб. №2 - кнопки удаления/редактирования) -->
        <button class="btn btn-icon btn-outline" @click.stop="$emit('edit', planet)" title="Редактировать">
          ✏️
        </button>
        <button class="btn btn-icon btn-danger" @click.stop="$emit('delete', planet)" title="Удалить">
          ❌
        </button>
      </div>
    </div>
    <div class="card-desc">{{ planet.description }}</div>
    <div class="card-meta">
      <span class="badge badge-primary">ID: {{ planet.id }}</span>
      <span>⭐ {{ starSystemName }}</span>
      <span v-if="planet.discoveryDate">📅 {{ planet.discoveryDate }}</span>
      <span v-else class="text-secondary">Известна с древности</span>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { store } from '../data/store.js'

// defineProps (Лаб. №6 - входные параметры компонента)
const props = defineProps({
  planet: {
    type: Object,
    required: true
  }
})

// Пользовательские события (Лаб. №6 - emit)
defineEmits(['edit', 'delete'])

// Computed для получения имени системы
const starSystemName = computed(() => {
  const system = store.getStarSystemById(props.planet.starSystemId)
  return system ? system.name : 'Неизвестно'
})
</script>
