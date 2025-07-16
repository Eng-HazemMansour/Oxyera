import { API_CONFIG } from '../config/api';
import { ApiError, ApiResponse } from '../types/common.types';

export class ApiClient {
  private baseURL: string;
  private timeout: number;
  private retryAttempts: number;

  constructor() {
    this.baseURL = API_CONFIG.baseUrl;
    this.timeout = API_CONFIG.timeout;
    this.retryAttempts = API_CONFIG.retryAttempts;
  }

  private async fetchWithTimeout(
    url: string,
    options: RequestInit = {},
    timeout: number = this.timeout
  ): Promise<Response> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
      const response = await fetch(url, {
        ...options,
        signal: controller.signal,
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
      });
      clearTimeout(timeoutId);
      return response;
    } catch (error) {
      clearTimeout(timeoutId);
      throw error;
    }
  }

  private async handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const apiError: ApiError = {
        message: errorData.message || `HTTP ${response.status}: ${response.statusText}`,
        status: response.status,
        details: errorData.details,
        timestamp: errorData.timestamp,
        path: errorData.path,
      };
      throw apiError;
    }

    const data = await response.json();
    return data;
  }

  private async retryRequest<T>(
    requestFn: () => Promise<T>,
    attempts: number = this.retryAttempts
  ): Promise<T> {
    try {
      return await requestFn();
    } catch (error) {
      if (attempts > 1 && this.shouldRetry(error)) {
        console.warn(`Request failed, retrying... (${this.retryAttempts - attempts + 1}/${this.retryAttempts})`);
        await this.delay(1000 * (this.retryAttempts - attempts + 1)); // Exponential backoff
        return this.retryRequest(requestFn, attempts - 1);
      }
      throw error;
    }
  }

  private shouldRetry(error: any): boolean {
    // Retry on network errors or 5xx server errors
    return (
      error.name === 'AbortError' ||
      error.name === 'TypeError' ||
      (error.status && error.status >= 500)
    );
  }

  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async get<T>(endpoint: string): Promise<T> {
    return this.retryRequest(async () => {
      const response = await this.fetchWithTimeout(`${this.baseURL}${endpoint}`);
      return this.handleResponse<T>(response);
    });
  }

  async post<T>(endpoint: string, data: any): Promise<T> {
    return this.retryRequest(async () => {
      const response = await this.fetchWithTimeout(`${this.baseURL}${endpoint}`, {
        method: 'POST',
        body: JSON.stringify(data),
      });
      return this.handleResponse<T>(response);
    });
  }

  async put<T>(endpoint: string, data: any): Promise<T> {
    return this.retryRequest(async () => {
      const response = await this.fetchWithTimeout(`${this.baseURL}${endpoint}`, {
        method: 'PUT',
        body: JSON.stringify(data),
      });
      return this.handleResponse<T>(response);
    });
  }

  async patch<T>(endpoint: string, data: any): Promise<T> {
    return this.retryRequest(async () => {
      const response = await this.fetchWithTimeout(`${this.baseURL}${endpoint}`, {
        method: 'PATCH',
        body: JSON.stringify(data),
      });
      return this.handleResponse<T>(response);
    });
  }

  async delete<T>(endpoint: string): Promise<T> {
    return this.retryRequest(async () => {
      const response = await this.fetchWithTimeout(`${this.baseURL}${endpoint}`, {
        method: 'DELETE',
      });
      return this.handleResponse<T>(response);
    });
  }
}

// Export singleton instance
export const apiClient = new ApiClient(); 