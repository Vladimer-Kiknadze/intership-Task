import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { LoadingService, SkipLoading } from './loading.service';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  constructor(private loadingService: LoadingService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (req.context.get(SkipLoading)) {
      // Pass the request directly to the next handler
      return next.handle(req);
    }

    // Turn on the loading spinner
    this.loadingService.loadingOn();

    return next
      .handle(req)
      .pipe(finalize(() => this.loadingService.loadingOff()));
  }
}
