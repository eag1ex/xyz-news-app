import { Injectable } from '@angular/core'
import { Subject } from 'rxjs'
import { IRouteParams } from '@xyz/interfaces'
import { debounceTime } from 'rxjs/operators'
import { isFunction, sq } from 'x-utils-es';

/**
 * Initialize at app.component and
 * dispatch router change events to child components
 */

@Injectable({
    providedIn: 'root',
})
export class RouterEventService {
    /** dispatch event value to routeChange on callback */
    private sub: Subject<IRouteParams>
    private subscribed = sq()
    private unsubs = []
    constructor() {
        this.sub = new Subject()
    }

    /**
     * Subscribe to route events via callack
     */
    public routeChange(cb: (params: IRouteParams) => void): void {
        const s = this.sub.pipe(debounceTime(500)).subscribe((n) => {
            if (isFunction(cb)) cb(n)
        })
        this.subscribed.resolve(true)
        this.unsubs.push(s)
    }

    /**
     * Will dispatch next value once, subscription is active
     */
    public dispatch(params: IRouteParams): void {
        this.subscribed.then(() => {
            this.sub.next(params)
        })
    }

    /**
     * Unsubscribe from all active subs
     */
     public unsubscribe(): number {
        let inx = 0
        this.unsubs.forEach((s) => {
            try {
                s.unsubscribe()
                inx++
            } catch (err) {}
        })
        return inx
    }
}
