// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    production: false,
    serviceWorker: false,
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

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
import 'zone.js/dist/zone-error' // Included with Angular CLI.
