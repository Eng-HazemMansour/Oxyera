export interface AppConfig {
  port: number;
  corsOrigin: string;
  corsCredentials: boolean;
  nodeEnv: string;
  logLevel: string;
}

export const getAppConfig = (): AppConfig => ({
  port: parseInt(process.env.PORT || '8080', 10),
  corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  corsCredentials: process.env.CORS_CREDENTIALS === 'true' || true,
  nodeEnv: process.env.NODE_ENV || 'development',
  logLevel: process.env.LOG_LEVEL || 'debug',
}); 