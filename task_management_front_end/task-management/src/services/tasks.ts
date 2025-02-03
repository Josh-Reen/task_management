import { apiRequest } from './api'
import type { Task, CreateTaskData, UpdateTaskData } from '@/types/task.types'

export const taskService = {
  async getTasks(): Promise<Task[]> {
    return apiRequest<Task[]>('/tasks')
  },

  async createTask(taskData: CreateTaskData): Promise<Task> {
    return apiRequest<Task>('/tasks', {
      method: 'POST',
      body: JSON.stringify(taskData)
    })
  },

  async updateTask(taskId: number, updates: UpdateTaskData): Promise<Task> {
    return apiRequest<Task>(`/tasks/${taskId}`, {
      method: 'PUT',
      body: JSON.stringify(updates)
    })
  },

  async deleteTask(taskId: number, data: any): Promise<void> {
    return apiRequest<void>(`/tasks/${taskId}`, {
      method: 'DELETE',
      body: JSON.stringify(data)
    })
  }
}