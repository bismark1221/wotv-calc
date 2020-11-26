import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler, Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

import { environment } from '../environments/environment';
import { AppComponent } from './app.component';

import * as Sentry from '@sentry/browser';
import { Integrations } from '@sentry/tracing';

Sentry.init({
  dsn: 'https://f611768edae94682b4a13e7d0923334d@o420310.ingest.sentry.io/5338340',
  // TryCatch has to be configured to disable XMLHttpRequest wrapping, as we are going to handle
  // http module exceptions manually in Angular's ErrorHandler and we don't want it to capture the same error twice.
  // Please note that TryCatch configuration requires at least @sentry/browser v5.16.0.
  release: 'prod',
  integrations: [
    new Sentry.Integrations.TryCatch({
      XMLHttpRequest: false,
    }),
    new Integrations.BrowserTracing()
  ],
  tracesSampleRate: 0.2
});

@Injectable()
export class SentryErrorHandler implements ErrorHandler {
  constructor() {}

  extractError(error) {
    if (error && error.ngOriginalError) {
      error = error.ngOriginalError;
    }

    if (typeof error === 'string' || error instanceof Error) {
      return error;
    }

    if (error instanceof HttpErrorResponse) {
      if (error.error instanceof Error) {
        return error.error;
      }

      if (error.error instanceof ErrorEvent) {
        return error.error.message;
      }

      if (typeof error.error === 'string') {
        return `Server returned code ${error.status} with body "${error.error}"`;
      }

      return error.message;
    }

    return null;
  }

  handleError(error) {
    const extractedError = this.extractError(error) || 'Handled unknown error';
    const eventId = Sentry.captureException(extractedError);

    throw extractedError;
  }
}
