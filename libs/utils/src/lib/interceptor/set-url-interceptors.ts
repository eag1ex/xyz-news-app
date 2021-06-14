import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class SetUrlInterceptor implements HttpInterceptor {
  constructor(@Inject('BASE_API_URL') private baseUrl: string) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
    let newRequest: HttpRequest<any>;

    if (/^https?:/.test(request.url) || request.url.startsWith('/')) {
      newRequest = request.clone({
        url: request.url
      });
    } else {
      newRequest = request.clone({
        url: `${this.baseUrl}/${request.url}`
      });
    }

    return next.handle(newRequest);
  }
}
