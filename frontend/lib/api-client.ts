import { API_CONFIG } from '../config/api';
import { ApiError } from '../types/common.types';

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
        await this.delay(1000 * (this.retryAttempts - attempts + 1));
        return this.retryRequest(requestFn, attempts - 1);
      }
      throw error;
    }
  }

  private shouldRetry(error: unknown): boolean {
    return (
      error instanceof Error && (
        error.name === 'AbortError' ||
        error.name === 'TypeError'
      )
    ) || (
      typeof error === 'object' &&
      error !== null &&
      'status' in error &&
      typeof (error as { status: unknown }).status === 'number' &&
      (error as { status: number }).status >= 500
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

  async post<T>(endpoint: string, data: unknown): Promise<T> {
    return this.retryRequest(async () => {
      const response = await this.fetchWithTimeout(`${this.baseURL}${endpoint}`, {
        method: 'POST',
        body: JSON.stringify(data),
      });
      return this.handleResponse<T>(response);
    });
  }
}

export const apiClient = new ApiClient(); 