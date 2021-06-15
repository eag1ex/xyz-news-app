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

export type TStories = 'top' | 'best' | 'new'
export interface IRouteParams{
  story?: TStories
}
export interface ITooltipItem{
  value: string;
  name: string
}