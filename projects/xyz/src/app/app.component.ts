import { Component } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'
import { Title } from '@angular/platform-browser'
import { log } from 'x-utils-es'
import {pageTitle} from '@xyz/data'
import {currentRoute} from '@xyz/utils'
import { IRouteParams } from '@xyz/interfaces'
import { RouterEventService } from '@xyz/services'

@Component({
    selector: 'xyz-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    public title = pageTitle
    constructor(
        private eventService: RouterEventService,
        private activatedRoute: ActivatedRoute, protected router: Router, private titleService: Title) {
        this.routerEvents()
    }

    private routerEvents(): void {
        this.router.events.subscribe(async (val: any) => {
            log('[app][loading]', val.constructor.name)
            const { routerEvent } = val
            let newTitle
            let routeName: IRouteParams
            if (routerEvent && this.currentRoute('/app/stories/top')) {
                log('NavigationEnd', 'currentRoute /app/stories/top')
                newTitle = `${this.title} | ${currentRoute('top').value}`
                routeName = {story: 'top'}
            }
            if (routerEvent && this.currentRoute('/app/stories/best')) {
                log('NavigationEnd', 'currentRoute /app/stories/best')
                newTitle = `${this.title} | ${currentRoute('best').value}`
                routeName = {story: 'best'}
            }
            if (routerEvent && this.currentRoute('/app/stories/new')) {
                log('NavigationEnd', 'currentRoute /app/stories/new')
                newTitle = `${this.title} | ${currentRoute('new').value}`
                routeName = {story: 'new'}
            }
            if (newTitle){
              this.titleService.setTitle(newTitle);
            }

            if (routeName){
                this.eventService.dispatch(routeName)
            }

        })

    }

    private currentRoute(val = ''): boolean {
        const routerState = (this.activatedRoute.snapshot as any)._routerState || {}
        if ((routerState.url || '').includes(val)) {
            return true
        }
        return false
    }
}
