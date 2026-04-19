<template>
  <div class="container">
    <div class="page-header">
      <h1>💰 Бюджет космических миссий</h1>
      <p>Учёт доходов и расходов на исследования космоса</p>
    </div>

    <div style="display: grid; grid-template-columns: 350px 1fr; gap: 2rem; align-items: start;">
      <div class="card" style="position: sticky; top: 90px;">
        <h3 style="margin-bottom: 1rem; color: var(--color-primary-light);">Новая операция</h3>
        
        <div class="form-group">
          <label>Название статьи бюджета</label>
          <input
            type="text"
            class="form-control"
            v-model.trim="title"
            placeholder="Например: Топливо для ракеты"
            @keyup.enter="addTransaction"
          />
        </div>

        <div class="form-group">
          <label>Сумма (положительная = доход, отрицательная = расход)</label>
          <input
            type="number"
            class="form-control"
            v-model.number="amount"
            placeholder="0"
            @keyup.enter="addTransaction"
          />
        </div>

        <button
          class="btn btn-primary"
          @click="addTransaction"
          :disabled="!title || !amount"
          style="width: 100%;"
        >
          + Добавить операцию
        </button>
      </div>

      <div>

        <div v-if="history.length > 0">
          <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; margin-bottom: 2rem;">
            <div class="card" style="text-align: center;">
              <div class="text-secondary" style="font-size: 0.85rem;">Общий баланс</div>
              <div style="font-size: 1.8rem; font-weight: 700; margin-top: 0.5rem;"
                :class="totalBalance >= 0 ? 'income' : 'expense'">
                {{ formatCurrency(totalBalance) }}
              </div>
            </div>

            <div class="card" style="text-align: center; border-top: 3px solid var(--color-income);">
              <div class="text-secondary" style="font-size: 0.85rem;">Доходы</div>
              <div class="income" style="font-size: 1.8rem; font-weight: 700; margin-top: 0.5rem;">
                +{{ formatCurrency(incomeBalance) }}
              </div>
            </div>

            <div class="card" style="text-align: center; border-top: 3px solid var(--color-expense);">
              <div class="text-secondary" style="font-size: 0.85rem;">Расходы</div>
              <div class="expense" style="font-size: 1.8rem; font-weight: 700; margin-top: 0.5rem;">
                {{ formatCurrency(outcomeBalance) }}
              </div>
            </div>
          </div>

          <h3 style="margin-bottom: 1rem; color: var(--color-primary-light);">📋 История операций</h3>

          <div
            v-for="item in history"
            :key="item.id"
            class="card mb-2"
            :class="item.amount >= 0 ? 'income-bg' : 'expense-bg'"
            style="padding: 1rem 1.25rem;"
          >
            <div class="flex-between">
              <div>
                <div style="font-weight: 600;">{{ item.text }}</div>
                <div class="text-secondary" style="font-size: 0.8rem;">#{{ item.id }}</div>
              </div>
              <div class="flex gap-2" style="align-items: center;">
                <span
                  style="font-size: 1.2rem; font-weight: 700;"
                  :class="item.amount >= 0 ? 'income' : 'expense'"
                >
                  {{ item.amount >= 0 ? '+' : '' }}{{ formatCurrency(item.amount) }}
                </span>
                
                <button class="btn btn-icon btn-outline btn-sm" @click="renameTransaction(item)" title="Переименовать">
                  ✏️
                </button>
                <button class="btn btn-icon btn-danger btn-sm" @click="deleteTransaction(item.id)" title="Удалить">
                  ❌
                </button>
              </div>
            </div>
          </div>
        </div>

        <div class="empty-state" v-else>
          <div class="icon">💸</div>
          <p>Вы не совершали финансовых операций</p>
          <p class="text-secondary mt-1" style="font-size: 0.9rem;">Добавьте первую операцию с помощью формы слева</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// 1. Реактивная переменная history
const history = ref([])
let nextId = 1

// Поля формы 
const title = ref('')
const amount = ref(0)

// 4. computed - сумма доходов 
const incomeBalance = computed(() => {
  return history.value
    .filter(item => item.amount > 0)
    .reduce((sum, item) => sum + item.amount, 0)
})

// 5. computed - сумма расходов 
const outcomeBalance = computed(() => {
  return history.value
    .filter(item => item.amount < 0)
    .reduce((sum, item) => sum + item.amount, 0)
})

// 6. computed - общий баланс 
const totalBalance = computed(() => {
  return incomeBalance.value + outcomeBalance.value
})

// Добавление операции 
function addTransaction() {
  if (!title.value || !amount.value) return

  history.value.push({
    id: nextId++,
    text: title.value,
    amount: amount.value
  })

  title.value = ''
  amount.value = 0
}

// Удаление 
function deleteTransaction(id) {
  history.value = history.value.filter(item => item.id !== id)
}

// Переименование 
function renameTransaction(item) {
  const newName = prompt('Введите новое название:', item.text)
  if (newName !== null && newName.trim() !== '') {
    item.text = newName.trim()
  }
}

function formatCurrency(value) {
  return new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    maximumFractionDigits: 0
  }).format(value)
}
</script>
