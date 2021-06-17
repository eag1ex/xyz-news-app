
import utf8 from 'utf8'
import base64 from 'base-64'

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

