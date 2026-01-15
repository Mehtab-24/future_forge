const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '/api/v1';

interface ApiResponse<T> {
  data?: T;
  error?: string;
  message?: string;
}

class ApiService {
  private getAuthHeader() {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    return token ? { Authorization: `Bearer ${token}` } : {};
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...(this.getAuthHeader() as Record<string, string>),
          ...(options.headers ? options.headers as Record<string, string> : {}),
        },
      });

      const data = await response.json();

      if (!response.ok) {
        return { error: data.message || 'Request failed', message: data.message };
      }

      return { data };
    } catch (error) {
      console.error('API Request Error:', error);
      return { error: 'Network error occurred', message: 'Failed to connect to server' };
    }
  }

  // Auth endpoints
  async login(email: string, password: string) {
    return this.request<{ token: string; user: any }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }

  async register(name: string, email: string, password: string) {
    return this.request<{ token: string; user: any }>('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
    });
  }

  async getCurrentUser() {
    return this.request<any>('/auth/me', {
      method: 'GET',
    });
  }

  // Simulation endpoints (no auth required)
  async simulateBaseline(skills: string[], interests: string[], constraints: string[]) {
    return this.request<any>('/simulate?mock=1', {
      method: 'POST',
      body: JSON.stringify({
        user_skills: skills,
        interests,
        constraints,
      }),
      // Remove auth header for simulation and ensure proper headers
      headers: {
        'Content-Type': 'application/json',
      }
    });
  }

  async simulateVariant(
    skills: string[], 
    interests: string[], 
    constraints: string[], 
    oneChange: string
  ) {
    return this.request<any>('/simulate-variant?mock=1', {
      method: 'POST',
      body: JSON.stringify({
        user_skills: skills,
        interests,
        constraints,
        one_change: oneChange,
      }),
      // Remove auth header for simulation and ensure proper headers
      headers: {
        'Content-Type': 'application/json',
      }
    });
  }

  // Utility methods
  setToken(token: string | null) {
    if (typeof window !== 'undefined') {
      if (token) {
        localStorage.setItem('token', token);
      } else {
        localStorage.removeItem('token');
      }
    }
  }

  getToken() {
    return typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  }

  isAuthenticated() {
    return !!this.getToken();
  }

  logout() {
    this.setToken(null);
  }
}

export const api = new ApiService();