import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiResponse } from '@kajlagbe/types';

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, ApiResponse<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<ApiResponse<T>> {
    return next.handle().pipe(
      map((response) => {
        // If the controller already returned a custom formatted response
        if (response && typeof response === 'object' && 'success' in response) {
          return {
            timestamp: new Date().toISOString(),
            ...response,
          };
        }

        // If response is separated into data & message or meta
        if (response && typeof response === 'object' && ('data' in response || 'meta' in response)) {
          return {
            success: true,
            message: response.message || 'Operation successful',
            data: response.data,
            meta: response.meta,
            timestamp: new Date().toISOString(),
          };
        }

        return {
          success: true,
          message: 'Operation successful',
          data: response,
          timestamp: new Date().toISOString(),
        };
      }),
    );
  }
}

