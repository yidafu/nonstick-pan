import axios, { AxiosRequestConfig } from 'axios';

const instance = axios.create({ baseURL: 'http://localhost:8202/api' });

export interface IBaseResponse<T> {
  data: T,
  code: number;
  msg: string;
}

function request<T, D = any>(config: AxiosRequestConfig<D>) {
  return instance.request<IBaseResponse<T>>(config)
    .then((resp) => {
      if (resp.status >= 200 && resp.status < 300) {
        if (resp.data.code === 0) {
          return resp.data.data;
        }
        throw new Error(resp.data.msg);
      } else {
        throw new Error(resp.data?.msg ?? '网路错误');
      }
    });
}

export function GET<R>(url: string, params?: any) {
  return request<R>({
    method: 'GET',
    url,
    params,
  });
}

export function PATCH<R>(url: string, data: Partial<R>) {
  return request<R>({
    method: 'PATCH',
    url,
    data,
  });
}
