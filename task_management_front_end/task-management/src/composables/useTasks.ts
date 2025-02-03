import { ref, onMounted } from 'vue'
import type { Ref } from 'vue'
import { taskService } from '@/services/tasks'
import type { Task, CreateTaskData, UpdateTaskData } from '@/types/task.types'

export function useTasks() {
  const tasks: Ref<Task[]> = ref([])
  const loading = ref(false)
  const error: Ref<string | null> = ref(null)

  const fetchTasks = async () => {
    try {
      loading.value = true
      error.value = null
      
      tasks.value = await (await taskService.getTasks()).reverse()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to fetch tasks'
      throw error.value
    } finally {
      loading.value = false
    }
  }

  const createTask = async (taskData: CreateTaskData) => {
    try {
      loading.value = true
      error.value = null
      const newTask = await taskService.createTask(taskData)
      tasks.value = [...tasks.value, newTask]
      return newTask
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to create task'
      throw error.value
    } finally {
      loading.value = false
    }
  }

  const updateTask = async (taskId: number, updates: UpdateTaskData) => {
    try {
      loading.value = true
      error.value = null
      const updatedTask = await taskService.updateTask(taskId, updates)
      const index = tasks.value.findIndex(t => t.id === taskId)
      if (index !== -1) {
        tasks.value[index] = updatedTask
      }
      return updatedTask
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to update task'
      throw error.value
    } finally {
      loading.value = false
    }
  }

  const deleteTask = async (taskId: number, data: any) =>  {
    try {
      loading.value = true
      error.value = null
      await taskService.deleteTask(taskId, data)
      const index = tasks.value.findIndex(t => t.id === taskId)
      if (index!== -1) {
        tasks.value.splice(index, 1)
      }
    } catch (err) {
      error.value = err instanceof Error? err.message : 'Failed to delete task'
      throw error.value
    } finally {
      loading.value = false
    }
  }

  onMounted(() => {
    if (localStorage.getItem('token')) {
      fetchTasks()
    }
  })

  return {
    tasks,
    loading,
    error,
    fetchTasks,
    createTask,
    updateTask,
    deleteTask
  }
}