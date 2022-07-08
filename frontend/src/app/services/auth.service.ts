import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

import { Observable } from 'rxjs';
import { first, catchError, tap, map } from "rxjs/operators";

import { User } from "../models/User";
import { ErrorHandlerService } from './error-handler.service';
import { TokenService } from './token.service';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = "http://localhost:3000/scheduler";

  //isLogged$ = new BehaviorSubject<boolean>(false);

  userId!: Pick<User, "id">;

  httpOptions: { headers: HttpHeaders } = {
    headers: new HttpHeaders({ "Content-Type": "application/json"}),
  };


  constructor(
    private http: HttpClient,
    private errorHandlerService: ErrorHandlerService,
    private router: Router, private tokenStorage: TokenService) {

  }
  public jwtHelper:JwtHelperService = new JwtHelperService();

  public isAuthenticated(): boolean {

    const token = this.tokenStorage.getToken();
    // true or false
    console.log( token, token!)
    return !this.jwtHelper.isTokenExpired(token!);
  }

  signup(user: Omit<User, "id">): Observable<User>{
    return this.http.post<User>(`${this.url}/signup`, user, this.httpOptions).pipe(first(), catchError(this.errorHandlerService.handleError<User>("signup")));
  }

  login(email: Pick<User, "email">,password: Pick<User, "password">): Observable<any>
  {
    console.log("login service")
    return this.http
      .post(`${this.url}/login`, { email, password }, this.httpOptions);
  }

}
