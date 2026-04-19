<template>
  <div class="modal-overlay" @click.self="$emit('cancel')">
    <div class="modal-content">
      <h2>{{ title }}</h2>
      <p style="color: var(--color-text-secondary); margin-bottom: 1rem;">{{ message }}</p>
      <div class="modal-actions">
        <button class="btn btn-outline" @click="$emit('cancel')">Отмена</button>
        <button class="btn btn-danger" @click="$emit('confirm')">Удалить</button>
      </div>
    </div>
  </div>
</template>

<script setup>
// defineProps 
defineProps({
  title: { type: String, default: 'Подтверждение' },
  message: { type: String, default: 'Вы уверены?' }
})

// Пользовательские события 
defineEmits(['confirm', 'cancel'])
</script>
