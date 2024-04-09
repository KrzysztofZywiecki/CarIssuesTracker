import { ApplicationConfig, importProvidersFrom } from "@angular/core";
import {
  provideRouter,
  withComponentInputBinding,
  withViewTransitions,
} from "@angular/router";

import { routes } from "./app.routes";
import { provideAnimationsAsync } from "@angular/platform-browser/animations/async";
import {
  HTTP_INTERCEPTORS,
  HttpClientModule,
  provideHttpClient,
} from "@angular/common/http";
import { AuthInterceptor } from "./auth/helpers/auth.interceptor";
import { provideNativeDateAdapter } from "@angular/material/core";

export const appConfig: ApplicationConfig = {
  providers: [
    provideNativeDateAdapter(),
    importProvidersFrom(HttpClientModule),
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    provideRouter(routes, withViewTransitions(), withComponentInputBinding()),
    provideAnimationsAsync(),
  ],
};
