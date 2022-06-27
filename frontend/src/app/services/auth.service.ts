import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { JwtHelperService,JWT_OPTIONS   } from '@auth0/angular-jwt';

import { BehaviorSubject, Observable } from 'rxjs';
import { first, catchError, tap, map } from "rxjs/operators";

import { Room } from "../models/Room";
import { User } from "../models/User";
import { ErrorHandlerService } from './error-handler.service';
import { TokenStorageService } from './token-storage.service';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = "http://localhost:3000";

  //isLogged$ = new BehaviorSubject<boolean>(false);

  userId!: Pick<User, "id">;

  httpOptions: { headers: HttpHeaders } = {
    headers: new HttpHeaders({ "Content-Type": "application/json"}),
  };


  constructor(
    private http: HttpClient,
    private errorHandlerService: ErrorHandlerService,
    private router: Router, private tokenStorage: TokenStorageService) {

  }
  public jwtHelper:JwtHelperService = new JwtHelperService();
  public isAuthenticated(): boolean {

    const token = this.tokenStorage.getToken();    // Check whether the token is expired and return
    // true or false
    console.log( token, token!)
    return !this.jwtHelper.isTokenExpired(token!);
  }

  signup(user: Omit<User, "id">): Observable<User>{
    return this.http.post<User>(`${this.url}/auth/signup`, user, this.httpOptions).pipe(first(), catchError(this.errorHandlerService.handleError<User>("signup")));
  }

  login(email: Pick<User, "email">,password: Pick<User, "password">): Observable<any>
  {
    console.log("login service")
    return this.http
      .post(`${this.url}/auth/login`, { email, password }, this.httpOptions)
  }

  addUsers(email: string): Observable<string>
  {
    console.log("add users")
    return this.http.post<string>(`${this.url}/auth/addUsers`, {email})
  }
}
