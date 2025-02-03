export interface User {
    id: number;
    user: string;
    name?: string;
    createdAt: string;
  }
  
  export interface LoginCredentials {
    username: string;
    password: string;
  }
  
  export interface RegisterData extends LoginCredentials {
    name?: string;
  }
  
  export interface AuthResponse {
    username: User;
    token: string;
  }