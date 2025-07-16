interface ApiConfig {
  baseUrl: string;
  timeout: number;
  retryAttempts: number;
}

const getApiConfig = (): ApiConfig => ({
  baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080',
  timeout: parseInt(process.env.NEXT_PUBLIC_API_TIMEOUT || '10000', 10),
  retryAttempts: parseInt(process.env.NEXT_PUBLIC_RETRY_ATTEMPTS || '3', 10),
});

export const API_CONFIG = getApiConfig(); 