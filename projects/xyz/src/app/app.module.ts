import { NgModule } from '@angular/core'
import { HttpClientModule } from '@angular/common/http'
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { AppComponent } from './app.component'
import { MainComponent } from './main/main.component'
import { ServiceWorkerModule } from '@angular/service-worker'
import { environment } from '../environments/environment'
import { AppRoutingModule } from './app.routing.module'
import { debug, disableLogging } from 'x-utils-es'
import { XYZComponentsModule } from '@xyz/components'
import { ThemeModule } from '@xyz/theme'
import { MaterialModule } from '@xyz/material'
import { XYZBackendProvider } from '@xyz/http'

// disable console.log
if (environment.production === true) {
    debug(`-- Using Angular 11.x --`)
    debug(`-- CONSOLE LOGS DISABLES --`)
    // tslint:disable-next-line: only-arrow-functions
    console.log = function() {}
    disableLogging()
}

@NgModule({
    declarations: [AppComponent, MainComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        ServiceWorkerModule.register('ngsw-worker.js', {
            enabled: environment.production,
            // Register the ServiceWorker as soon as the app is stable
            // or after 30 seconds (whichever comes first).
            registrationStrategy: 'registerWhenStable:30000',
        }),

        MaterialModule,
        ThemeModule,
        BrowserAnimationsModule,
        HttpClientModule,
        XYZComponentsModule,
    ],
    providers: [
       XYZBackendProvider,
        {
            provide: 'ENVIRONMENT_PRODUCTION',
            useValue: environment.production,
        },
        {
            provide: 'ENVIRONMENT',
            useValue: environment,
        },
        {
            provide: 'API_BASE_URL',
            useValue: environment.apiBaseUrl,
        },

    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
