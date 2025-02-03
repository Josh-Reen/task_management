<template>
    <div class="task-list">
      <div v-if="loading" class="loading">Loading tasks...</div>
      <div v-else-if="error" class="error-message">{{ error }}</div>
      <div v-else-if="!tasks.length" class="empty-state">
        No tasks yet. Create your first task above!
      </div>
      
      <TaskCard 
        v-else
        v-for="task in tasks" 
        :key="task.id" 
        :task="task"
        @update="handleTaskUpdate"
        @delete="handleTaskDelete"
      />
    </div>
  </template>
  
  <script setup lang="ts">
  import { onMounted } from 'vue'
  import { useTasks } from '@/composables/useTasks'
  import TaskCard from './TaskCard.vue'
  import type { Task, UpdateTaskData } from '@/types/task.types'
  
  const { tasks, loading, error, fetchTasks, updateTask, deleteTask } = useTasks()
  
  onMounted(() => {
    fetchTasks()
  })
  
  const handleTaskUpdate = async (taskId: number, updates: UpdateTaskData) => {
    try {
      await updateTask(taskId, updates)
    } catch (err) {
      console.error('Failed to update task:', err)
    }
  }

  const handleTaskDelete = async (taskId: number, data: any) => {
    try {
      await deleteTask(taskId, data)
    } catch (err) {
      console.error('Failed to delete task:', err)
    }
  }
  </script>