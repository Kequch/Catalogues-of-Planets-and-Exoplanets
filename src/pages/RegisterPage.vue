<template>
  <div class="container">
    <div class="page-header">
      <h1>👤 Регистрация исследователя</h1>
      <p>Зарегистрируйтесь для доступа к полному каталогу планет</p>
    </div>

    <div style="max-width: 550px;">
      <div class="card">
        <div class="form-group">
          <label>Имя</label>
          <input
            type="text"
            class="form-control"
            v-model.trim="user.firstName"
            placeholder="Введите ваше имя"
          />
        </div>

        <div class="form-group">
          <label>Фамилия</label>
          <input
            type="text"
            class="form-control"
            v-model.trim="user.lastName"
            placeholder="Введите вашу фамилию"
          />
        </div>

        <div class="form-group">
          <label>Пол</label>
          <div class="radio-group">
            <label class="radio-label">
              <input type="radio" v-model="user.gender" value="male" />
              Мужской
            </label>
            <label class="radio-label">
              <input type="radio" v-model="user.gender" value="female" />
              Женский
            </label>
          </div>
        </div>

        <div class="form-group">
          <label>Пароль</label>
          <input
            :type="showPassword ? 'text' : 'password'"
            class="form-control"
            v-model="user.password"
            placeholder="Введите пароль"
          />
        </div>

        <div class="form-group">
          <label>Подтверждение пароля</label>
          <input
            :type="showPassword ? 'text' : 'password'"
            class="form-control"
            v-model="user.confirmPassword"
            placeholder="Повторите пароль"
          />
        </div>

        <div class="form-group">
          <button
            class="btn btn-outline btn-sm"
            @mousedown="showPassword = true"
            @mouseup="showPassword = false"
            @mouseleave="showPassword = false"
          >
            👁️ Показать пароль
          </button>
        </div>

        <p
          v-if="user.password && user.confirmPassword && !passwordsMatch"
          class="text-danger"
          style="font-size: 0.9rem; margin-bottom: 1rem;"
        >
          ⚠️ Пароли не совпадают
        </p>

        <p
          v-if="user.firstName || user.lastName"
          style="color: var(--color-accent-light); margin-bottom: 1rem; font-size: 0.95rem;"
        >
          Пользователь: {{ user.firstName }} {{ user.lastName }}.
          {{ user.gender === 'male' ? 'Мужского' : 'Женского' }} пола.
        </p>

        <button
          class="btn btn-primary"
          :disabled="!passwordsMatch || !user.firstName || !user.lastName || !user.password"
          @click="register"
          style="width: 100%;"
        >
          🚀 Зарегистрироваться
        </button>

        <div
          v-if="registered"
          class="mt-2"
          style="padding: 1rem; background: rgba(0, 184, 148, 0.15); border-radius: var(--radius-sm); border: 1px solid var(--color-income);"
        >
          ✅ Регистрация прошла успешно! Добро пожаловать, {{ registeredName }}!
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, computed } from 'vue'

// Реактивный объект 
const user = reactive({
  firstName: '',
  lastName: '',
  gender: 'male',
  password: '',
  confirmPassword: ''
})

// showPassword переменная
const showPassword = ref(false)
const registered = ref(false)
const registeredName = ref('')

// Computed - проверка совпадения паролей 
const passwordsMatch = computed(() => {
  return user.password === user.confirmPassword
})

// обработчик клика, вывод в консоль
function register() {
  console.log('Данные формы регистрации:', {
    firstName: user.firstName,
    lastName: user.lastName,
    gender: user.gender,
    password: user.password
  })

  registeredName.value = `${user.firstName} ${user.lastName}`
  registered.value = true

  // Сброс формы
  user.firstName = ''
  user.lastName = ''
  user.gender = 'male'
  user.password = ''
  user.confirmPassword = ''
}
</script>
