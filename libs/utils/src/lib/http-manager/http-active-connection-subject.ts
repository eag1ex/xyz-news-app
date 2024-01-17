import { BehaviorSubject } from 'rxjs'

export class HttpActiveConnectionSubject extends BehaviorSubject<number> {
    /**
     * default active connection to 0
     */
    constructor() {
        super(0)
    }

    /**
     * Add 1 to actice connection counter
     */
    up(): void {
        this.next(this.value + 1)
    }

    /**
     * Remove 1 from active connection counter
     */
    down(): void {
        this.next(this.value - 1)
    }
}
