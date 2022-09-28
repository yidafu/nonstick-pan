import { URL_PREFIX } from '@/constants';

/**
 * generate url with prefix
 *
 * @export
 * @param {string} url
 * @returns
 */
export function gUrl(url: string) {
  return `${URL_PREFIX}${url}`;
}
