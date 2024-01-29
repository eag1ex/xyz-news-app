import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Inject, Injectable } from '@angular/core'
import { Ienv, IUser, IStoryItem, TQueries, TStoryTypes } from '@xyz/interfaces'
import { log, onerror } from 'x-utils-es'
import { Observable, Subject, throwError } from 'rxjs'
import { catchError, debounceTime, filter, timeout, switchMap, tap } from 'rxjs/operators'

/**
 * NOTE URI provided via ./proxy
 */

@Injectable({
    providedIn: 'root',
})
export class UserHttpService {
    private baseUrl: string
    sub$: Subject<string> = new Subject()
    constructor(private http: HttpClient, @Inject('ENVIRONMENT') protected ENVIRONMENT: Ienv) {
        this.baseUrl = this.ENVIRONMENT.URI ? this.ENVIRONMENT.URI + `/${this.ENVIRONMENT.apiBaseUrl}` : this.ENVIRONMENT.apiBaseUrl
    }

    user(id: string): Observable<IUser> {
        if (!id) return throwError('id not provided')
        const sufix = `${this.baseUrl}/user/${id}`
        log(`-- calling ${sufix}`)
        return this.http.get<any>(`${sufix}`).pipe(
            // how long to wait before we exit)
            timeout(8000)
        )
    }

    get user$(): Observable<IUser> {
        return this.sub$.pipe(
            debounceTime(500),
            filter((v) => !!v),
            switchMap((m) => this.user(m)),
            tap((d) => {
                log('[user]', d)
            }),
            catchError((err) => {
                onerror('[user]', err)
                return throwError(err)
            })
        )
        // retry with timeout works differently
        // .pipe(retry(1))
    }
}
