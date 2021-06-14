export interface Ienv {
    production: boolean
    serviceWorker: boolean
    appLandingUrl: string
    apiBaseUrl: string
    adalConfigs: {
        tenant?: string
        clientId?: string
        navigateToLoginRequestUrl?: boolean
        cacheLocation?: string
    }
}
