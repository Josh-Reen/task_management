export class ApiError extends Error {
    constructor(
      message: string,
      public status?: number,
      public data?: any
    ) {
      super(message)
      this.name = 'ApiError'
    }
  }
  
  const API_BASE = import.meta.env.VITE_API_BASE_URL
  
  export async function apiRequest<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const token = localStorage.getItem('token')
    
    const defaultHeaders: HeadersInit = {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` })
    }
  
    const config: RequestInit = {
      ...options,
      headers: {
        ...defaultHeaders,
        ...options.headers
      }
    }
  
    try {
      const response = await fetch(`${API_BASE}${endpoint}`, config)
      const data = await response.json()
  
      if (!response.ok) {
        throw new ApiError(
          data.message || 'An error occurred',
          response.status,
          data
        )
      }
  
      return data as T
    } catch (error) {
      if (error instanceof ApiError) {
        throw error
      }
      throw new ApiError(
        error instanceof Error ? error.message : 'Network error'
      )
    }
  }
  