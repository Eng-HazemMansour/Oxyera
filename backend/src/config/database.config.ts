import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const getDatabaseConfig = (): TypeOrmModuleOptions => {
  const isProduction = process.env.NODE_ENV === 'production';
  
  return {
    type: (process.env.DB_TYPE as any) || 'sqlite',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432', 10),
    username: process.env.DB_USERNAME || '',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_DATABASE || 'database.sqlite',
    entities: [__dirname + '/../**/entities/*.entity{.ts,.js}'],
    synchronize: process.env.DB_SYNCHRONIZE === 'true' || !isProduction,
    logging: process.env.NODE_ENV === 'development',
    ssl: isProduction ? { rejectUnauthorized: false } : false,
  };
}; 