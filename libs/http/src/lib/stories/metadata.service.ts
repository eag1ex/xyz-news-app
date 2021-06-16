import { HttpClient } from '@angular/common/http'
import { Inject, Injectable } from '@angular/core'
import { Ienv, IMetadata } from '@xyz/interfaces'
import { isEmpty, log, onerror } from 'x-utils-es'
import { Observable, Subject, throwError } from 'rxjs'
import { catchError, debounceTime, filter, timeout, switchMap, tap } from 'rxjs/operators'
import { encrypt } from '@xyz/utils'

/**
 * NOTE URI provided via ./proxy
 */

interface IMeta {
    response: IMetadata
}

@Injectable({
    providedIn: 'root',
})
export class MetadataHttpService {
    private baseUrl: string
    sub$: Subject<string> = new Subject()
    constructor(private http: HttpClient, @Inject('ENVIRONMENT') protected ENVIRONMENT: Ienv) {
        this.baseUrl = this.ENVIRONMENT.apiBaseUrl
    }

    private meta(url: string): Observable<IMeta> {
        if (isEmpty(url)) return throwError('url not provided')

        const sufix = `${this.baseUrl}/metadata/${encrypt(url)}`
        //  if (params.paged) sufix = `${sufix}?paged=${params.paged}`
        log(`-- calling ${sufix}`)
        return this.http.get<any>(`${sufix}`).pipe(
            // how long to wait before we exit)
            timeout(8000)
        )
    }

    get meta$(): Observable<IMeta> {
        return this.sub$.pipe(
            debounceTime(400),
            filter((v) => !!v),
            switchMap((m) => this.meta(m)),
            tap((d) => {
                log('[meta]', d)
            }),
            catchError((err) => {
                // not critical so dont print it
              //  onerror('[metadata]', err)
                return throwError(err)
            })
        )
        // retry with timeout works differently
        // .pipe(retry(1))
    }
}
