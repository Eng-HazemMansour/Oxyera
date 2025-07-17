import { Injectable, NestMiddleware, BadRequestException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as yup from 'yup';

@Injectable()
export abstract class BaseValidationMiddleware implements NestMiddleware {
  protected abstract getSchema(): yup.ObjectSchema<any>;
  protected getProperty(): 'body' | 'query' | 'params' {
    return 'body';
  }

  async use(req: Request, res: Response, next: NextFunction) {
    try {
      const property = this.getProperty();
      const dataToValidate = req[property];

      const validatedData = await this.getSchema().validate(dataToValidate, {
        abortEarly: false,
        stripUnknown: true,
      });

      req[property] = validatedData;
      next();
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        const validationErrors = error.inner.map((err) => ({
          field: err.path,
          message: err.message,
        }));

        throw new BadRequestException({
          message: 'Validation failed',
          errors: validationErrors,
          statusCode: 400,
        });
      }
      next(error);
    }
  }
} 