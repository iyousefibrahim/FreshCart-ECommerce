import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter, withHashLocation, withInMemoryScrolling, withViewTransitions } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { NgxSpinnerModule } from 'ngx-spinner';
import { loadingInterceptor } from './core/interceptors/loading.interceptor';
import { headersInterceptor } from './core/interceptors/headers.interceptor';


export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withViewTransitions(), withInMemoryScrolling({ scrollPositionRestoration: "top" })),
    provideHttpClient(withInterceptors([loadingInterceptor,headersInterceptor])),
    importProvidersFrom(BrowserAnimationsModule,NgxSpinnerModule),
    provideToastr(),
    provideAnimations(),
  ]
};
