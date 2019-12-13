import { Injectable } from "@angular/core";
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";
import { finalize } from "rxjs/operators";
import { SpinLoaderService } from '../shared/spin-loader.service';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
  constructor(public spinLoaderService: SpinLoaderService) { }
  
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.spinLoaderService.show();
    return next.handle(req).pipe(
      finalize(() => this.spinLoaderService.hide())
    );
  }
}