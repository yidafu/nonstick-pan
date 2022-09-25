import { URL_PREFIX } from '@/constants';

export function generateUrl(url: string) {
  return `${URL_PREFIX}${url}`;
}
