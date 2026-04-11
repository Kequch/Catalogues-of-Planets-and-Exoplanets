<template>
  <div>
    <!-- Hero секция -->
    <section class="hero">
      <h1>🪐 Каталог планет и экзопланет</h1>
      <p>Исследуйте звёздные системы, планеты и их орбитальные характеристики в интерактивном каталоге</p>

      <!-- Статистика (Лаб. №4 - computed переменные для подсчёта) -->
      <div class="features-grid">
        <router-link to="/star-systems" class="feature-card">
          <div class="icon">⭐</div>
          <h3>Звёздные системы</h3>
          <p>{{ starSystemCount }} {{ pluralize(starSystemCount, 'система', 'системы', 'систем') }}</p>
        </router-link>

        <router-link to="/planets" class="feature-card">
          <div class="icon">🪐</div>
          <h3>Планеты</h3>
          <p>{{ planetCount }} {{ pluralize(planetCount, 'планета', 'планеты', 'планет') }}</p>
        </router-link>

        <router-link to="/orbital-positions" class="feature-card">
          <div class="icon">🛸</div>
          <h3>Орбитальные позиции</h3>
          <p>{{ orbitalCount }} {{ pluralize(orbitalCount, 'запись', 'записи', 'записей') }}</p>
        </router-link>

        <router-link to="/register" class="feature-card">
          <div class="icon">👤</div>
          <h3>Регистрация</h3>
          <p>Форма регистрации исследователя</p>
        </router-link>

        <router-link to="/budget" class="feature-card">
          <div class="icon">💰</div>
          <h3>Бюджет миссий</h3>
          <p>Учёт расходов космических миссий</p>
        </router-link>

       

        
      </div>
    </section>

    <!-- Последние добавленные планеты -->
    <div class="container">
      <div class="page-header">
        <h1>🔭 Последние добавленные планеты</h1>
        <p>Недавно открытые миры в нашем каталоге</p>
      </div>

      <div class="card-grid" v-if="recentPlanets.length > 0">
        <div
          v-for="planet in recentPlanets"
          :key="planet.id"
          class="card"
          @click="$router.push(`/planets/${planet.id}`)"
          style="cursor: pointer;"
        >
          <div class="card-title">{{ planet.name }}</div>
          <div class="card-desc">{{ planet.description }}</div>
          <div class="card-meta">
            <span>⭐ {{ getStarSystemName(planet.starSystemId) }}</span>
            <span v-if="planet.discoveryDate">📅 {{ planet.discoveryDate }}</span>
          </div>
        </div>
      </div>

      <div class="empty-state" v-else>
        <div class="icon">🌑</div>
        <p>Планеты ещё не добавлены</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { store } from '../data/store.js'

// Computed переменные (Лаб. №4)
const starSystemCount = computed(() => store.starSystems.length)
const planetCount = computed(() => store.planets.length)
const orbitalCount = computed(() => store.orbitalPositions.length)

const recentPlanets = computed(() => {
  return [...store.planets].reverse().slice(0, 6)
})

function getStarSystemName(id) {
  const system = store.getStarSystemById(id)
  return system ? system.name : 'Неизвестно'
}

// Склонение слов
function pluralize(count, one, few, many) {
  const n = Math.abs(count) % 100
  const n1 = n % 10
  if (n > 10 && n < 20) return many
  if (n1 > 1 && n1 < 5) return few
  if (n1 === 1) return one
  return many
}
</script>
