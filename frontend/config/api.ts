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

export const API_ENDPOINTS = {
  PATIENTS: `${API_CONFIG.baseUrl}/patients`,
  MEDICATIONS: `${API_CONFIG.baseUrl}/medications`,
  ASSIGNMENTS: `${API_CONFIG.baseUrl}/assignments`,
  ASSIGNMENTS_WITH_REMAINING_DAYS: `${API_CONFIG.baseUrl}/assignments/with-remaining-days`,
} as const;

export const API_BASE_URL = API_CONFIG.baseUrl; 