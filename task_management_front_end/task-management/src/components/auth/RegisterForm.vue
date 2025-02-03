<template>
    <form @submit.prevent="handleSubmit" class="auth-form">
      <h2>Register</h2>
      <div v-if="error" class="error-message">{{ error }}</div>
  
      <div class="form-group">
        <input 
          type="email" 
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
        {{ loading ? 'Registering...' : 'Register' }}
      </button>
      
      <p class="toggle-text">
        Already have an account? 
        <a href="#" @click.prevent="$emit('toggle')">Login</a>
      </p>
    </form>
  </template>
  
  <script setup lang="ts">
  import { reactive, ref } from 'vue'
  import { useAuth } from '@/composables/useAuth'
  import type { RegisterData } from '@/types/auth.types'
  
  const emit = defineEmits<{
    (e: 'toggle'): void
  }>()
  
  const { register } = useAuth()
  const loading = ref(false)
  const error = ref<string | null>(null)
  
  const form = reactive<RegisterData>({
    username: '',
    password: ''
  })
  
  const handleSubmit = async () => {
    try {
      loading.value = true
      error.value = null
      await register(form)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Registration failed'
    } finally {
      loading.value = false
    }
  }
  </script>
  