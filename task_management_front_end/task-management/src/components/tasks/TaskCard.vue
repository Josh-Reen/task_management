<template>
  <div class="task-card" :class="task.status">
    <div class="task-header">
      <input 
        v-model="editableTitle" 
        class="task-title"
        placeholder="Enter title..."
      />
      <div class="task-actions">
        <select v-model="currentStatus" @change="handleStatusChange">
          <option value="incomplete">Incomplete</option>
          <option value="completed">Completed</option>
        </select>
        <button @click="confirmDelete" class="delete-btn">🗑️</button>
      </div>
    </div>

    <textarea 
      v-model="editableDescription"
      class="task-description"
      placeholder="Enter description..."
    ></textarea>

    <div class="task-footer">
      <span class="task-date">Created: {{ formatDate(task.createdAt) }}</span>
      <button @click="updateTask" class="update-btn">Update</button>
    </div>
  </div>

  <!-- Confirmation Dialog -->
  <div v-show="showDeleteConfirm" class="confirmation-dialog">
    <div class="dialog-overlay" @click="showDeleteConfirm = false"></div>
    <div class="dialog-content">
      <p>Are you sure you want to remove this task?</p>
      <button @click.stop="deleteTask">Yes, Delete</button>
      <button @click="showDeleteConfirm = false">Cancel</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import type { Task, TaskStatus } from '@/types/task.types'

const props = defineProps<{ task: Task }>()

const emit = defineEmits<{
  (e: 'update', id: number, updates: { title?: string, description?: string, status?: TaskStatus, userId: number }): void
  (e: 'delete', id: number, updates: { userId: number }): void
}>()

const currentStatus = ref<TaskStatus>(props.task.status)
const editableTitle = ref(props.task.title)
const editableDescription = ref(props.task.description)
const showDeleteConfirm = ref(false)

const handleStatusChange = () => {
  const user = JSON.parse(localStorage.getItem('user') || '{}')
  if (!user.id) return
  emit('update', props.task.id, { status: currentStatus.value, userId: user.id })
}

const updateTask = () => {
  const user = JSON.parse(localStorage.getItem('user') || '{}')
  if (!user.id) return
  emit('update', props.task.id, { 
    title: editableTitle.value, 
    description: editableDescription.value, 
    userId: user.id 
  })
}

const confirmDelete = () => {
  showDeleteConfirm.value = true
}

const deleteTask = () => {
  const user = JSON.parse(localStorage.getItem('user') || '{}')
  if (!user.id) return
  emit('delete', props.task.id, { userId: user.id })
  showDeleteConfirm.value = false
}

const formatDate = (date: string): string => new Date(date).toLocaleDateString()

watch(() => props.task.status, (newStatus) => {
  currentStatus.value = newStatus
})
</script>

<style scoped>
/* Modern Task Card */
.task-card {
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  transition: 0.3s;
  width: 100%; /* Use full width of the parent container */
  margin: 16px 0; /* Adjust margin if needed */
  box-sizing: border-box; /* Ensures padding and border are part of the total width */
}

.task-card:hover {
  transform: translateY(-3px);
}

/* Header */
.task-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.task-title {
  font-size: 1.2rem;
  font-weight: bold;
  border: none;
  outline: none;
  flex: 1;
  background: transparent;
  padding: 6px;
  border-radius: 6px;
}

.task-title:focus {
  border: 1px solid #007bff;
  background: #f9f9f9;
}

.task-actions {
  display: flex;
  gap: 8px;
}

.task-actions select {
  padding: 6px;
  border-radius: 6px;
  border: 1px solid #ddd;
}

.delete-btn {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.2rem;
  transition: 0.2s;
}

.delete-btn:hover {
  color: red;
}

/* Description */
.task-description {
  width: 100%;
  min-height: 60px;
  border: none;
  outline: none;
  background: #f7f7f7;
  padding: 10px;
  border-radius: 6px;
  resize: none;
}

.task-description:focus {
  border: 1px solid #007bff;
  background: #fff;
}

/* Footer */
.task-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 12px;
}

.task-date {
  font-size: 0.9rem;
  color: #666;
}

.update-btn {
  background: #007bff;
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 6px;
  cursor: pointer;
  transition: 0.2s;
}

.update-btn:hover {
  background: #0056b3;
}

/* Confirmation Dialog */
.confirmation-dialog {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.dialog-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
}

.dialog-content {
  background: white;
  padding: 20px;
  border-radius: 12px;
  text-align: center;
  z-index: 20;
}

.dialog-content button {
  margin: 10px;
  padding: 8px 12px;
  border-radius: 6px;
  cursor: pointer;
  border: none;
}

.dialog-content button:first-child {
  background: #ff5c5c;
  color: white;
}

.dialog-content button:first-child:hover {
  background: #f44336;
}

.dialog-content button:last-child {
  background: #ccc;
  color: black;
}

.dialog-content button:last-child:hover {
  background: #bbb;
}
</style>

