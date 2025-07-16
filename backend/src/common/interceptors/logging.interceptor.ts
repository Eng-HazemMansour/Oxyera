import { Injectable, NestInterceptor, ExecutionContext, CallHandler, Logger } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Request, Response } from 'express';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger(LoggingInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();

    const { method, url, ip } = request;
    const userAgent = request.get('User-Agent') || '';
    const startTime = Date.now();

    this.logger.log(`${method} ${url} - ${ip} - ${userAgent} - START`);

    return next.handle().pipe(
      tap({
        next: (responseBody) => {
          const { statusCode } = response;
          const responseTime = Date.now() - startTime;
          
          this.logger.log(
            `${method} ${url} - ${ip} - ${statusCode} - ${responseTime}ms - SUCCESS`
          );
        },
        error: (error) => {
          const responseTime = Date.now() - startTime;
          const statusCode = error.status || 500;
          
          this.logger.error(
            `${method} ${url} - ${ip} - ${statusCode} - ${responseTime}ms - ERROR: ${error.message}`
          );
        },
      }),
    );
  }
} 