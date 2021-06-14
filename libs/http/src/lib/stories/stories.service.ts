import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Ienv, IUser, IStoryItem, TQueries, TStoryTypes } from '@xyz/interfaces';
import { isEmpty, log, onerror } from 'x-utils-es'
import { empty, Observable, Subject, throwError, timer } from 'rxjs';
import { catchError, debounce, debounceTime, filter, map, timeout, switchMap, retry, tap } from 'rxjs/operators';


/**
* NOTE URI provided via ./proxy
*/

interface IParams{
    type: TStoryTypes,
    paged?: number
}
interface IStories{
    response: IStoryItem[];
    paged: number;
    pagedTotal: number;
}

@Injectable({
    providedIn: 'root',
})
export class StoriesHttpService {
  private baseUrl: string
    sub$: Subject<IParams> = new Subject()
    constructor(private http: HttpClient, @Inject('ENVIRONMENT') protected ENVIRONMENT: Ienv) {
      this.baseUrl = this.ENVIRONMENT.apiBaseUrl
    }

    stories(params: IParams): Observable<IStories> {
        if (isEmpty(params)) return throwError('params not provided')

        const sufix = new URL('/' + params.type)
        if (params.paged) sufix.searchParams.set('paged', params.paged as any)
        const url = params.toString()
        log(`-- calling ${url}`)
        return this.http.get<any>(`${url}`)
    }

    get stories$(): Observable<IStories> {
      return this.sub$.pipe(
        debounceTime(500),
       // timeout(10000),
        filter(v => !!v),
        switchMap(m => this.stories(m)),
        tap(d => {
            log('[stories]', d)
        }),
        catchError(err => {
          onerror('[stories]', err)
          return throwError(err);
        })
      ).pipe(retry(1))
    }
}
