import axios, { AxiosRequestConfig } from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3000',
});

function request<T, D = any>(config: AxiosRequestConfig<D>) {
  return instance.request<T>(config)
    .then((resp) => {
      if (resp.status >= 200 && resp.status < 300) {
        return resp.data;
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
