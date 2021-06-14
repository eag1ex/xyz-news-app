import { HttpClient } from '@angular/common/http'
import { Inject, Injectable } from '@angular/core'
import { Ienv, IUser, IStoryItem, TQueries, TStoryTypes } from '@xyz/interfaces'
import { isEmpty, log, onerror } from 'x-utils-es'
import { empty, Observable, Subject, throwError, timer } from 'rxjs'
import { catchError, debounce, debounceTime, filter, map, timeout, switchMap, retry, tap } from 'rxjs/operators'

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
        this.baseUrl = this.ENVIRONMENT.apiBaseUrl
    }

    user(id: string): Observable<IUser> {
        if (!id) return throwError('id not provided')
        const sufix = new URL('/user/' + id)
        const url = sufix.toString()
        log(`-- calling ${url}`)
        return this.http.get<any>(`${url}`)
    }

    get user$(): Observable<IUser> {
        return this.sub$
            .pipe(
                debounceTime(500),
                // timeout(10000),
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
            .pipe(retry(1))
    }
}
