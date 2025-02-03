<template>
    <form @submit.prevent="handleSubmit" class="auth-form">
      <h2>Login</h2>
      <div v-if="error" class="error-message">{{ error }}</div>
      
      <div class="form-group">
        <input 
          type="text" 
          v-model="form.username" 
          placeholder="username"
          required
        />
      </div>
      
      <div class="form-group">
        <input 
          type="password" 
          v-model="form.password" 
          placeholder="Password"
          required
        />
      </div>
  
      <button type="submit" :disabled="loading">
        {{ loading ? 'Logging in...' : 'Login' }}
      </button>
      
      <p class="toggle-text">
        Need an account? 
        <a href="#" @click.prevent="$emit('toggle')">Register</a>
      </p>
    </form>
  </template>
  
  <script setup lang="ts">
  import { reactive, ref } from 'vue'
  import { useAuth } from '@/composables/useAuth'
  import type { LoginCredentials } from '@/types/auth.types'
  
  const emit = defineEmits<{
    (e: 'toggle'): void
  }>()
  
  const { login } = useAuth()
  const loading = ref(false)
  const error = ref<string | null>(null)
  
  const form = reactive<LoginCredentials>({
    username: '',
    password: ''
  })
  
  const handleSubmit = async () => {
    try {
      loading.value = true
      error.value = null

      await login(form)
      
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Login failed'
    } finally {
      loading.value = false
    }
  }
  </script>