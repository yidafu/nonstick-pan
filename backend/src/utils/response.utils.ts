import { IBaseResponase } from '@pan/common';

export class ResponseUtils {
  static success<T = any>(data: T): IBaseResponase<T> {
    return {
      code: 0,
      data,
      msg: 'ok',
    };
  }
}
