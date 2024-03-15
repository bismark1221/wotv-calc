import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Inject, Injectable, Optional } from '@angular/core';
import { REQUEST } from '@nguniversal/express-engine/tokens';
import { Request } from 'express';

// case insensitive check against config and value
const startsWithAny = (arr: string[] = []) => (value = '') => {
  return arr.some(test => value.toLowerCase().startsWith(test.toLowerCase()));
};

// http, https, protocol relative
const isAbsoluteURL = startsWithAny(['http', '//']);

@Injectable()
export class UniversalRelativeInterceptor implements HttpInterceptor {
  constructor(@Optional() @Inject(REQUEST) protected request: Request) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    if (this.request && !isAbsoluteURL(req.url)) {
      let host = this.request.get('host');

      if (host.split(':')[0] === 'localhost' && req.url.split('/')[1] === 'api') {
        host = 'localhost:4201';
      }

      const protocolHost = `${this.request.protocol}://${host}`;
      const pathSeparator = !req.url.startsWith('/') ? '/' : '';
      const url = protocolHost + pathSeparator + req.url;
      const serverRequest = req.clone({ url });
      return next.handle(serverRequest);
    } else {
      return next.handle(req);
    }
  }
}
