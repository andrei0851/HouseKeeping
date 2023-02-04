import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  registerURL = "/auth/register";
  loginURL = "/auth/authenticate";

  constructor(private http: HttpClient) {

   }

  register(registerData1: any): Observable<any>{
    return this.http.post(environment.API_SERVER + this.registerURL,registerData1);
  }

  login(loginData: any): Observable<any>{
    return this.http.post(environment.API_SERVER + this.loginURL,loginData);
  }


}
