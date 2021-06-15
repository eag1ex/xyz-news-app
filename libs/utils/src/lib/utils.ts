

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

export {hostName}