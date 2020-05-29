import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEventType,
} from "@angular/common/http";

export class AuthInterceptorsService implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const newRequest = req.clone({
      headers: req.headers.append("Auth", "xyz"),
    });
    return next.handle(newRequest);
  }
}
