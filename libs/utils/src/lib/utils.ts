
import utf8 from 'utf8'
import base64 from 'base-64'


/**
 * return host from full url
 */
const hostName = (url: string): string => {
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
const encrypt = (str: string) => {
     if (!str) return ''
     const bytes = utf8.encode(str);
     const encoded = base64.encode(bytes);
     return encoded
 }

export { encrypt }
export { hostName }