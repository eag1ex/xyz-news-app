import {
  HTTP_INTERCEPTORS,
  HttpErrorResponse,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {  HttpManagerService } from '@xyz/utils';
import { Observable, of, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
// import {log, onerror} from 'x-utils-es'


@Injectable()
export class XYZHttpInterceptor implements HttpInterceptor {
  constructor(private httpManager: HttpManagerService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
    const headers = {
     'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Origin': '*'
    };

    request = request.clone({
      url: request.url,
      headers: new HttpHeaders({ ...headers })
    });

    // if (request.method === 'GET') {
    //   request = request.clone({
    //     url: request.url,
    //     headers: new HttpHeaders({ ...headers })
    //   });
    // }

    // if (request.method === 'POST') {
    //   request = request.clone({
    //     url: request.url,
    //     headers: request.headers.set('Accept', 'application/json')
    //     // body: request.body
    //   });
    // }

    return next.handle(request).pipe(
      switchMap(l => {
        return of(l);
      }),
      this.httpManager.operators(),
      catchError(error => this.customErrorHandler(request.method, error))
    );
  }

  private customErrorHandler(method: string, error: HttpErrorResponse): Observable<any> {
    const { status } = error;

    if (status === 401 || status === 403 || (status === 500 && method === 'GET')) {
      this.httpManager.addErrors(error);

      return throwError(error);
    } else {
      // we catch it and just re-create new error too
      return throwError(error);
    }
  }
}

export let XYZBackendProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: XYZHttpInterceptor,
  multi: true
};
