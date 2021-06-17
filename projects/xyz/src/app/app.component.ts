import { Component } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'
import { Title } from '@angular/platform-browser'
import { log } from 'x-utils-es'
import {pageTitle} from '@xyz/data'
import {currentRoute} from '@xyz/utils'

@Component({
    selector: 'xyz-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    public title = pageTitle
    constructor(private activatedRoute: ActivatedRoute, protected router: Router, private titleService: Title) {
        this.routerEvents()
    }
    // TODO add service to dispatch current page state to page and child components
    private routerEvents(): void {
        this.router.events.subscribe(async (val: any) => {
            log('[app][loading]', val.constructor.name)
            const { routerEvent } = val
            let newTitle
            if (routerEvent && this.currentRoute('/app/stories/top')) {
                log('NavigationEnd', 'currentRoute /app/stories/top')
                newTitle = `${this.title} | ${currentRoute('top').value}`
            }
            if (routerEvent && this.currentRoute('/app/stories/best')) {
                log('NavigationEnd', 'currentRoute /app/stories/best')
                newTitle = `${this.title} | ${currentRoute('best').value}`
            }
            if (routerEvent && this.currentRoute('/app/stories/new')) {
                log('NavigationEnd', 'currentRoute /app/stories/new')
                newTitle = `${this.title} | ${currentRoute('new').value}`
            }
            if (newTitle){
              this.titleService.setTitle(newTitle);
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
