import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Ienv, IStoriesReps, IStoryParams } from '@xyz/interfaces';
import { isEmpty, log, onerror } from 'x-utils-es'
import {  from, Observable, of, Subject, throwError} from 'rxjs';
import { catchError, debounceTime, filter,  timeout, switchMap, tap, map, first} from 'rxjs/operators';
import { XYXstates } from '@xyz/states';


/**
* NOTE URI provided via ./proxy
*/

@Injectable({
    providedIn: 'root',
})
export class StoriesHttpService {
  private baseUrl: string
    sub$: Subject<IStoryParams> = new Subject()
    constructor(
      private states: XYXstates,
      private http: HttpClient, @Inject('ENVIRONMENT') protected ENVIRONMENT: Ienv) {
      this.baseUrl = this.ENVIRONMENT.apiBaseUrl
    }

    private stories(params: IStoryParams): Observable<IStoriesReps> {
        if (isEmpty(params)) return throwError('params not provided')

        let sufix = `${this.baseUrl}/stories/${ params.type}`
        if (params.paged) sufix = `${sufix}?paged=${params.paged}`
        log(`-- calling ${sufix}`)
        const http = (): Observable<IStoriesReps> => this.http.get<any>(`${sufix}`)
        return from(this.states.story$(params.paged)).pipe(
        //  delay(10000),
          switchMap(n => {
          if (!n){
              return http()
              .pipe(
                map(nn => {
                  // set new cache
                  this.states.setStory(nn, params.paged)
                  return nn
                }))
            } else {
              log('[stories][cache]')
              return of(n)
            }
          }),
          first(),
           // how long to wait before we exit
          timeout(8000)
          )

    }

    get stories$(): Observable<IStoriesReps> {

      return this.sub$.pipe(
        debounceTime(400),
        filter(v => !!v),
        switchMap(m => this.stories(m)),
        tap(d => {
            log('[stories] ?', d)
        }),
        catchError(err => {
          onerror('[stories]', err)
          return throwError(err);
        }),
      )
      // retry with timeout works differently
      // .pipe(retry(1))
    }
}
