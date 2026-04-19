<template>
  <nav class="navbar">
    <div class="navbar-inner">
      <router-link to="/" class="navbar-brand">🌌 PlanetCatalog</router-link>
      <div class="navbar-links">
        <router-link to="/">Главная</router-link>
        <router-link to="/star-systems">Звёздные системы</router-link>
        <router-link to="/planets">Планеты</router-link>
        <router-link to="/orbital-positions">Орбиты</router-link>
        <router-link to="/register">Регистрация</router-link>
        <router-link to="/budget">Бюджет миссий</router-link>

      </div>
    </div>
  </nav>


  <router-view />


  <footer style="text-align: center; padding: 2rem; color: var(--color-text-secondary); border-top: 1px solid var(--color-border); font-size: 0.85rem;">
    🌌 Каталог планет и экзопланет — Курсовая работа Vue.js © {{ currentYear }}
  </footer>
</template>

<script setup>
import { computed } from 'vue'

const currentYear = computed(() => new Date().getFullYear())
</script>

<style>
/* Стили импортированы глобально через main.js */
</style>
