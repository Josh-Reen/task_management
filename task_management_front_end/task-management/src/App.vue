<template>
  <div class="container">
    <template v-if="!isLoggedIn">
      <LoginForm v-if="!isRegistering" @toggle="isRegistering = true" :key="'login'" />
      <RegisterForm v-else @toggle="isRegistering = false" :key="'register'" />
    </template>
    
    <div v-else class="tasks-container">
      <header class="header">
        <h2>My Tsks ({{ user?.username || 'Guest' }})</h2>
        <button @click="handleLogout" class="logout-btn">Logout</button>
      </header>

      <TaskForm @created="handleCreated"  style="margin-top: 10px;"/>
      <TaskList :key="counter"/>
    </div>
  </div>
</template>
  
  <script setup lang="ts">
  import { ref, watch, onMounted, onUnmounted, computed } from 'vue'
  import { useAuth } from './composables/useAuth'
  import LoginForm from './components/auth/LoginForm.vue'
  import RegisterForm from './components/auth/RegisterForm.vue'
  import TaskForm from './components/tasks/TaskForm.vue'
  import TaskList from './components/tasks/TaskList.vue'
  
  const isRegistering = ref(false)
  const { isLoggedIn, logout } = useAuth()
  const counter = ref(0)
  const user = computed(() => {
    try {
      return JSON.parse(localStorage.getItem('user') || '{}');
    } catch {
      return {};
    }
  })
  
  const handleLogout = () => {
    logout()
    isRegistering.value = false
  }

  const handleCreated = () => {
    counter.value++;
  }
  
  // Handle global auth changes (e.g., login/logout in another tab)
  const syncAuthState = () => {
    location.reload()
  }
  
  // Watch for changes in isLoggedIn and sync the UI
  watch(isLoggedIn, (newVal) => {
    if (!newVal) {
      isRegistering.value = false
    }
  })
  
  // Attach event listener for localStorage changes
  onMounted(() => {
    window.addEventListener('storage', syncAuthState)
  })
  
  onUnmounted(() => {
    window.removeEventListener('storage', syncAuthState)
  })
  </script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between; /* Pushes elements to opposite ends */
  align-items: center; /* Aligns items vertically */
  padding: 10px;
  border-bottom: 2px solid #ccc;
}

.logout-btn {
  padding: 8px 16px;
  background-color: #e74c3c;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: 0.3s;
}

.logout-btn:hover {
  background-color: #c0392b;
}
</style>
  
  