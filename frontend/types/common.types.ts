export interface ApiResponse<T> {
  data: T;
  message?: string;
  status: number;
}

export interface ApiError {
  message: string;
  status: number;
  details?: any;
  timestamp?: string;
  path?: string;
}

export interface BaseEntity {
  id: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface FormState<T> {
  data: T;
  errors: Partial<Record<keyof T, string>>;
  isSubmitting: boolean;
  isValid: boolean;
}

export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
}

export interface LoadingProps {
  loading: boolean;
  error?: string | null;
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

export interface PaginationParams {
  page: number;
  limit: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface FilterOptions {
  search?: string;
  dateFrom?: string;
  dateTo?: string;
  status?: string;
}

export interface ThemeConfig {
  colors: {
    primary: string;
    secondary: string;
    success: string;
    warning: string;
    error: string;
  };
}

export type Environment = 'development' | 'staging' | 'production'; 