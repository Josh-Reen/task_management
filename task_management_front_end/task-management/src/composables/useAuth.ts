import { ref, computed, watchEffect } from 'vue'
import type { Ref } from 'vue'
import { authService } from '@/services/auth'
import type { User, LoginCredentials, RegisterData, AuthResponse } from '@/types/auth.types'

export function useAuth() {
  const user: Ref<User | null> = ref(null)
  const token: Ref<string | null> = ref(localStorage.getItem('token'))
  const error: Ref<string | null> = ref(null)
  const loading = ref(false)

  // Ensure reactivity by tracking token updates
  const isLoggedIn = computed(() => Boolean(token.value))

  const setAuthData = (authResponse: AuthResponse) => {
    token.value = authResponse.token
    user.value = authResponse.user
    localStorage.setItem('token', authResponse.token)
    localStorage.setItem('user', JSON.stringify(authResponse.user))

    // Dispatch a custom event to notify other parts of the app
    window.dispatchEvent(new Event('storage'))
  }

  const login = async (credentials: LoginCredentials) => {
    try {
      loading.value = true
      error.value = null
      const response = await authService.login(credentials)
      setAuthData(response)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Login failed'
      throw error.value
    } finally {
      loading.value = false
    }
  }

  const register = async (userData: RegisterData) => {
    try {
      loading.value = true
      error.value = null
      const response = await authService.register(userData)
      setAuthData(response)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Registration failed'
      throw error.value
    } finally {
      loading.value = false
    }
  }

  const logout = () => {
    user.value = null
    token.value = null
    localStorage.removeItem('token')

    // Dispatch storage event
    window.dispatchEvent(new Event('storage'))
  }

  // Watch for external changes in localStorage and update `token`
  watchEffect(() => {
    token.value = localStorage.getItem('token')
  })

  return {
    user,
    error,
    loading,
    isLoggedIn,
    login,
    register,
    logout
  }
}
