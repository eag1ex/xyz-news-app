import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { DefaultParamEncoderInterceptor } from './default-param-encoder/interceptor';
import { SetUrlInterceptor } from './set-url-interceptors';

@NgModule({})
export class InterceptorModule {
  static forRoot(baseUrl: string): ModuleWithProviders<any> {
    return {
      ngModule: InterceptorModule,
      providers: [
        { provide: 'BASE_API_URL', useValue: baseUrl },
        {
          provide: HTTP_INTERCEPTORS,
          useClass: SetUrlInterceptor,
          multi: true
        },
        {
          provide: HTTP_INTERCEPTORS,
          useClass: DefaultParamEncoderInterceptor,
          multi: true
        }
      ]
    };
  }
}
