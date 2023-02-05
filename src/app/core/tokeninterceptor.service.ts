import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpHeaders, HttpResponse, HttpErrorResponse
} from '@angular/common/http';
import {catchError, Observable, tap} from 'rxjs';

export class TokenInterceptor implements HttpInterceptor {
  constructor() {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(this.setHeaders(request)).pipe(
        tap(
            (event: HttpEvent<any>) =>
            (error: any) =>{
              return;
            }
        )
    );
  }


  setHeaders(request: HttpRequest<any>) {
    let newHeaders = request.headers
        .set('Access-Control-Allow-Origin', '*')
        .set('Cache-Control', 'no-cache')
        .set('Pragma', 'no-cache')

    const token = localStorage.getItem('token');

    if (token) {
      newHeaders = newHeaders
          .set('Content-Type', 'application/json')
          .set('Authorization', 'Bearer ' + token);
    }

    return request.clone({headers: newHeaders});
  }
}