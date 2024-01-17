import { HttpClient } from '@angular/common/http'
import { Inject, Injectable } from '@angular/core'
import { Ienv, IMetaResp } from '@xyz/interfaces'
import { isEmpty, log } from 'x-utils-es'
import { Observable, Subject, throwError, of, from } from 'rxjs';
import { catchError, debounceTime, filter, timeout, switchMap, tap, map, first } from 'rxjs/operators';
import { encrypt } from '@xyz/utils'
import { XYXstates } from '@xyz/states';

/**
 * NOTE URI provided via ./proxy
 */


@Injectable({
    providedIn: 'root',
})
export class MetadataHttpService {
    private baseUrl: string
    sub$: Subject<string> = new Subject()
    constructor(
        private states: XYXstates,
        private http: HttpClient, @Inject('ENVIRONMENT') protected ENVIRONMENT: Ienv) {
        this.baseUrl = this.ENVIRONMENT.apiBaseUrl
    }

    private meta(url: string): Observable<IMetaResp> {
        if (isEmpty(url)) return throwError('url not provided')
        const eurl = encrypt(url)
        const sufix = `${this.baseUrl}/metadata/${eurl}`
        //  if (params.paged) sufix = `${sufix}?paged=${params.paged}`
        log(`-- calling ${sufix}`)

        const http = (): Observable<IMetaResp> => this.http.get<any>(`${sufix}`)
        return from(this.states.meta$(eurl)).pipe(
            //  delay(10000),
              switchMap(n => {
              if (!n){
                  return http()
                  .pipe(
                    map(nn => {
                      // set new cache
                      this.states.setMeta(eurl, nn)
                      return nn
                    }))
                } else {
                  log('[meta][cached]')
                  return of(n)
                }
              }),
              first(),
               // how long to wait before we exit
              timeout(10000)
              )
    }

    get meta$(): Observable<IMetaResp> {
        return this.sub$.pipe(
            debounceTime(400),
            filter((v) => !!v),
            switchMap((m) => this.meta(m)),
            tap((d) => {
                log('[meta]', d)
            }),
            catchError((err) => {
                // not critical so dont print it
                 log('no meta available')
                 return throwError(err);
            })
        )
        // retry with timeout works differently
        // .pipe(retry(1))
    }
}
