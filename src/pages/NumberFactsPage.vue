<template>
  <!--
    ЛАБОРАТОРНАЯ РАБОТА №5 - Случайные факты о числах
    Поле ввода, выпадающий список категорий, fetch GET-запрос, индикатор загрузки
  -->
  <div class="container">
    <div class="page-header">
      <h1>🔢 Факты о числах</h1>
      <p>Узнайте интересные факты о числах с помощью Numbers API</p>
    </div>

    <div style="max-width: 600px;">
      <div class="card">
        <!-- Поле ввода числа (Лаб. №5) -->
        <div class="form-group">
          <label>Число</label>
          <input
            type="number"
            class="form-control"
            v-model.number="number"
            placeholder="Введите число"
            @keyup.enter="searchFact"
          />
        </div>

        <!-- Выпадающий список категорий (Лаб. №5) -->
        <div class="form-group">
          <label>Категория</label>
          <select class="form-control" v-model="category">
            <option value="trivia">Trivia — случайный факт</option>
            <option value="math">Math — математический факт</option>
            <option value="year">Year — факт о годе</option>
          </select>
        </div>

        <!-- Поиск по кнопке или Enter (Лаб. №5) -->
        <button
          class="btn btn-primary"
          @click="searchFact"
          :disabled="loading || number === null || number === ''"
          style="width: 100%;"
        >
          🔍 Поиск
        </button>

        <!-- Индикатор загрузки (Лаб. №5) -->
        <div class="loading-container" v-if="loading">
          <div class="spinner"></div>
          <span>Загрузка факта...</span>
        </div>

        <!-- Результат -->
        <div v-if="result && !loading" class="mt-2">
          <div
            v-if="result.found"
            style="padding: 1.25rem; background: rgba(0, 206, 201, 0.1); border-radius: var(--radius-sm); border: 1px solid var(--color-accent);"
          >
            <div style="font-size: 0.85rem; color: var(--color-accent); margin-bottom: 0.5rem;">
              {{ getCategoryLabel(category) }} · {{ number }}
            </div>
            <div style="font-size: 1.05rem;">{{ result.text }}</div>
          </div>

          <!--
            Лаб. №5 - Если факт не найден: "{number} - скучное число/скучный год"
          -->
          <div
            v-else
            style="padding: 1.25rem; background: rgba(255, 107, 107, 0.1); border-radius: var(--radius-sm); border: 1px solid var(--color-danger);"
          >
            <div style="font-size: 1.05rem;">
              {{ number }} — {{ category === 'year' ? 'скучный год' : 'скучное число' }}
            </div>
          </div>
        </div>

        <!-- История запросов -->
        <div v-if="factHistory.length > 0" class="mt-3">
          <h3 style="margin-bottom: 1rem; color: var(--color-primary-light); font-size: 1rem;">
            📜 История запросов
          </h3>
          <div
            v-for="(fact, index) in factHistory"
            :key="index"
            class="card mb-2"
            style="padding: 0.75rem 1rem; font-size: 0.9rem;"
          >
            <span class="badge badge-primary" style="margin-right: 0.5rem;">{{ fact.category }}</span>
            <span class="text-accent" style="margin-right: 0.5rem;">{{ fact.number }}</span>
            <span>{{ fact.text }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const number = ref(42)
// По умолчанию trivia (Лаб. №5)
const category = ref('trivia')
const loading = ref(false)
const result = ref(null)
const factHistory = ref([])

// Fetch GET-запрос (Лаб. №5 + Лаб. №6 - fetch)
async function searchFact() {
  if (number.value === null || number.value === '') return

  loading.value = true
  result.value = null

  try {
    const response = await fetch(
      `http://numbersapi.com/${number.value}/${category.value}?json`
    )
    const data = await response.json()
    result.value = data

    // Добавляем в историю
    factHistory.value.unshift({
      number: number.value,
      category: category.value,
      text: data.found ? data.text : `${number.value} — ${category.value === 'year' ? 'скучный год' : 'скучное число'}`
    })

    // Ограничиваем историю
    if (factHistory.value.length > 10) {
      factHistory.value.pop()
    }
  } catch (error) {
    console.error('Ошибка запроса:', error)
    result.value = { found: false, text: 'Ошибка при получении данных' }
  } finally {
    loading.value = false
  }
}

function getCategoryLabel(cat) {
  const labels = { math: 'Математика', year: 'Год', trivia: 'Факт' }
  return labels[cat] || cat
}
</script>
