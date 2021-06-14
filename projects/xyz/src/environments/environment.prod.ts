export const environment = {
  production: true,
  serviceWorker: false,
  appLandingUrl: '/app/home',
  apiBaseUrl: '/api',
  adalConfigs: {
		tenant: 'na',
		clientId: 'na',
	// 	redirectUri: `http://localhost:${port}/auth/callback`,
	// 	postLogoutRedirectUri: `http://localhost:${port}/auth/login`,
		navigateToLoginRequestUrl: false,
		cacheLocation: 'localStorage'
	},
};
