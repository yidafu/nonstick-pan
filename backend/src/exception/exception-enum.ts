/**
 * 10      1       0001
 * ^       ^       ^
 * 业务域  错误类型  错误枚举值
 *
 * 业务域：
 *  01 => 大屏  02 => 组局
 *
 * 错误类型
 *  1 => 参数类型错误  2 => 参数值非法  3 => 数据校验失败 4 => 数据操作失败
 *
 * @export
 * @enum {number}
 */
export enum EExceptionCode {
  Parameter = 1010001,
}
