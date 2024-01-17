
import utf8 from 'utf8'
import base64 from 'base-64'
import { tooltipList } from '@xyz/data'
import { ITooltipItem } from '@xyz/interfaces';

export const repeat = (str, times) => new Array(times + 1).join(str);

export const padStart = (num, maxLength, char = ' ') =>
  repeat(char, maxLength - num.toString().length) + num;

export const formatTime = time => {
    const h = padStart(time.getHours(), 2, '0');
    const m = padStart(time.getMinutes(), 2, '0');
    const s = padStart(time.getSeconds(), 2, '0');
    const ms = padStart(time.getMilliseconds(), 3, '0');
    return `${h}:${m}:${s}.${ms}`;
  };

export const now = () => formatTime(new Date());

/**
 * Test current routeName to string value
 * - using imported tooltipList from static data
 */
export const currentRoute = (routeName: string): ITooltipItem => {
  const r = tooltipList.filter(n => n.name === routeName)[0]
  return (r && routeName) ? r : null
}


/**
 * return host from full url
 */
export const hostName = (url: string): string => {
    if (!url) return ''
    try {
        return new URL(url).host
    } catch (err) {
        return ''
    }
}


/**
 * Encrypt string with btoa, can be decrypted with atob
 */
export const encrypt = (str: string) => {
     if (!str) return ''
     const bytes = utf8.encode(str);
     const encoded = base64.encode(bytes);
     return encoded
 }

