import { ApiException } from './api.exception';
import { EExceptionCode } from './exception-enum';

export class ParamException extends ApiException {
  code: number = EExceptionCode.Parameter;
}
