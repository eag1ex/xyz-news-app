export const environment = {
    production: true,
    serviceWorker: true,
    appLandingUrl: '/app',
    // if using project "xyz-news-server"
    // apiBaseUrl: '/api',

    // if using from hosted on cyclic
    apiBaseUrl: '/xyz-api',
    URI: 'https://kind-gold-armadillo-sari.cyclic.app',
    functionCode: 'DFKJ884576*_35465fdjfuyrt+_*45@%_=_*56%@!~^',
    adalConfigs: {
        tenant: 'na',
        clientId: 'na',
        // 	redirectUri: `http://localhost:${port}/auth/callback`,
        // 	postLogoutRedirectUri: `http://localhost:${port}/auth/login`,
        navigateToLoginRequestUrl: false,
        cacheLocation: 'localStorage',
    },
}
