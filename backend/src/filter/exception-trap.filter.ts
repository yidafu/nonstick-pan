import {
  ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus,
} from '@nestjs/common';

import { HttpAdapterHost } from '@nestjs/core';
import { IBaseResponase } from '@pan/common';

import { ApiException } from '@/exception/api.exception';


@Catch()
export class ExceptionTrapFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) { }

  catch(exception: unknown, host: ArgumentsHost) {
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();

    const respBody: IBaseResponase<null> = { code: -1, data: null, msg: '网络错误' };
    if (exception instanceof ApiException) {
      respBody.code = exception.code;
      respBody.msg = exception.msg || '未知错误';

      httpAdapter.reply(ctx.getResponse(), respBody, HttpStatus.OK);
    } else if (exception instanceof HttpException) { // TODO: 判断逻辑还有点问题
      respBody.code = exception.getStatus();
      respBody.msg = exception.message;
      httpAdapter.reply(ctx.getResponse(), respBody, respBody.code);
    } else {
      respBody.code = HttpStatus.INTERNAL_SERVER_ERROR;
      respBody.msg = '服务器内部错误';
      httpAdapter.reply(ctx.getResponse(), respBody, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
