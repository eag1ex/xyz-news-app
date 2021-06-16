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

export interface IMetaDataHtmlList{
  name: string;
  /* if the value is flat it has not nested items, it will then be a string*/
  value?: Array<{name: string, value: string}> // or string
}
