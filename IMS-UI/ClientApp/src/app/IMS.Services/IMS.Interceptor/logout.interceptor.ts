import { Injectable } from "@angular/core";
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from "@angular/common/http";
import { Observable } from "rxjs";
import { Router } from "@angular/router";
import {  map  } from "rxjs/operators";
import { Response } from "src/app/IMS.Models/Response";

@Injectable()
export class LogoutInterceptor implements HttpInterceptor {
  constructor(public router: Router) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
            let resposne: Response = event.body;
            if (resposne.error != null && resposne.error.errorCode == 401) {
                this.router.navigateByUrl("/login");
            }
        }
        return event;
      })
    );
  }
}
