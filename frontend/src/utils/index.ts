import {
  URL_PREFIX,
} from '@/constants';

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

/**
 * 固定小数点后几位，丢弃超过的小数位数
 *
 * @export
 * @param {number} num
 * @param {number} fractionDigits
 * @returns
 */
export function toFixed(num: number, fractionDigits: number) {
  const fraction = fractionDigits * 10;
  // eslint-disable-next-line no-bitwise
  return (num * fraction | 0) / fraction;
}
