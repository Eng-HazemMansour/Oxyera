export interface ApiError {
  message: string;
  status: number;
  details?: unknown;
  timestamp?: string;
  path?: string;
}

export interface QueryOptions {
  enabled?: boolean;
  retry?: number;
  refetchOnWindowFocus?: boolean;
}

export interface MutationOptions<T> {
  onSuccess?: (data: T) => void;
  onError?: (error: Error) => void;
} 