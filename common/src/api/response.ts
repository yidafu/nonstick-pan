export interface IBaseResponase<T> {
  data: T,
  code: number;
  msg: string;
}