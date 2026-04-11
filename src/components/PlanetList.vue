<template>
  <!--
    Компонент списка планет.
    Аналог Лаб. №6 - компонент EmojiList (v-for + emit событие).
  -->
  <div class="card-grid" v-if="planets.length > 0">
    <PlanetCard
      v-for="planet in planets"
      :key="planet.id"
      :planet="planet"
      @click="$emit('selectPlanet', planet)"
      @edit="$emit('edit', planet)"
      @delete="$emit('delete', planet)"
    />
  </div>

  <div class="empty-state" v-else>
    <div class="icon">🌑</div>
    <p>{{ emptyMessage }}</p>
  </div>
</template>

<script setup>
import PlanetCard from './PlanetCard.vue'

// defineProps - массив планет (Лаб. №6 - EmojiList принимает массив)
defineProps({
  planets: {
    type: Array,
    required: true
  },
  emptyMessage: {
    type: String,
    default: 'Планеты не найдены'
  }
})

// Пользовательское событие selectPlanet (Лаб. №6 - selectEmoji)
defineEmits(['selectPlanet', 'edit', 'delete'])
</script>
