import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  logger = new Logger('IO');
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.getArgByIndex(3);
    const reqType = req?.parentType?.name;
    const reqName = req?.fieldName;
    const before = Date.now();
    this.logger.debug(`Before ${reqType} / ${reqName} / ${before}`);
    return next.handle().pipe(
      tap(() => {
        const after = Date.now();
        this.logger.debug(
          `After  ${reqType} / ${reqName} / ${after} (${after - before}ms)`
        );
      })
    );
  }
}
