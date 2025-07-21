import { provideRouter } from '@angular/router';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './auth.interceptor';
import { routes } from './app.routes';
import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { PoHttpRequestModule } from '@po-ui/ng-components';
import { DecimalPipe } from '@angular/common';
import { PoPageDynamicTableModule } from '@po-ui/ng-templates';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    DecimalPipe,
    provideHttpClient(withInterceptorsFromDi()),
    importProvidersFrom([PoHttpRequestModule]),
    importProvidersFrom(PoPageDynamicTableModule),
    provideZoneChangeDetection({ eventCoalescing: true }),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
};
