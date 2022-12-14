import {
  CallHandler, ExecutionContext, Injectable, NestInterceptor,
} from '@nestjs/common';
import {
  map, Observable,
} from 'rxjs';

@Injectable()
export class ResponseFormatInterceptor implements NestInterceptor {
  // eslint-disable-next-line class-methods-use-this
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> {
    return next.handle().pipe(
      map((data: any) => {
        console.log(data);
        return ({ data, code: 0, msg: 'ok' });
      }),
    );
  }
}
