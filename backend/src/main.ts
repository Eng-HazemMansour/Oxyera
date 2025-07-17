import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { getAppConfig } from './config';
import { GlobalExceptionFilter, LoggingInterceptor } from './common';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const appConfig = getAppConfig();
  
  const app = await NestFactory.create(AppModule);
  
  app.enableCors({
    origin: appConfig.corsOrigin,
    credentials: appConfig.corsCredentials,
  });
  
  app.useGlobalFilters(new GlobalExceptionFilter());
  
  if (appConfig.nodeEnv === 'development') {
    app.useGlobalInterceptors(new LoggingInterceptor());
  }
  
  await app.listen(appConfig.port);
  
  logger.log(`Application is running on port ${appConfig.port}`);
  logger.log(`Environment: ${appConfig.nodeEnv}`);
  logger.log(`CORS enabled for: ${appConfig.corsOrigin}`);
}

bootstrap().catch((error) => {
  const logger = new Logger('Bootstrap');
  logger.error('Failed to start application', error);
  process.exit(1);
});
