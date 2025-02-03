<template>
  <form @submit.prevent="handleSubmit" class="task-form">
    <div v-if="error" class="error-message">{{ error }}</div>

    <div class="form-group">
      <input 
        type="text" 
        v-model="form.title" 
        placeholder="Task title"
        class="input-field"
        required
      />
    </div>

    <div class="form-group">
      <textarea 
        v-model="form.description" 
        placeholder="Task description"
        rows="3"
        class="input-field"
      ></textarea>
    </div>

    <button type="submit" class="submit-btn" :disabled="loading">
      {{ loading ? 'Creating...' : 'Add Task' }}
    </button>
  </form>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useTasks } from '@/composables/useTasks'
import type { CreateTaskData, Task } from '@/types/task.types'

const { createTask } = useTasks()
const loading = ref(false)
const error = ref<string | null>(null)

const emit = defineEmits<{
  (e: 'created', task: Task): void
}>()

const form = reactive<CreateTaskData>({
  title: '',
  description: '',
  status: 'incomplete',
})

const handleSubmit = async () => {
  try {
    loading.value = true
    error.value = null
    const newTask = await createTask(form)
    emit('created', newTask)

    // Reset form
    form.title = ''
    form.description = ''
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Failed to create task'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
/* Form Container */
.task-form {
  background: #fff;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  max-width: 100%;
  margin: auto;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

/* Input Fields */
.input-field {
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s;
}

.input-field:focus {
  border-color: #007bff;
  outline: none;
}

/* Button */
.submit-btn {
  background: #007bff;
  color: white;
  font-size: 1rem;
  padding: 12px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.3s;
}

.submit-btn:hover {
  background: #0056b3;
}

.submit-btn:disabled {
  background: #aaa;
  cursor: not-allowed;
}

/* Error Message */
.error-message {
  color: red;
  font-size: 0.9rem;
  text-align: center;
}
</style>
