import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpParams,
  HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DefaultParamEncoder } from './encoder';

@Injectable()
export class DefaultParamEncoderInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const params = new HttpParams({
      encoder: new DefaultParamEncoder(),
      fromString: req.params.toString()
    });
    return next.handle(req.clone({ params }));
  }
}
