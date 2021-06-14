import { InterceptorModule } from './interceptor.module';

describe('InterceptorModule', () => {
  let interceptorModule: InterceptorModule;

  beforeEach(() => {
    interceptorModule = new InterceptorModule();
  });

  it('should create an instance', () => {
    expect(interceptorModule).toBeTruthy();
  });
});
