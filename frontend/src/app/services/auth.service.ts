import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

import { BehaviorSubject, Observable } from 'rxjs';
import { first, catchError, tap, map } from "rxjs/operators";

import { User } from "../models/User";
import { ErrorHandlerService } from './error-handler.service';
import { TokenStorageService } from './token-storage.service';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = "http://localhost:3000";

  isLogged$ = new BehaviorSubject<boolean>(false);

  userId!: Pick<User, "id">;

  httpOptions: { headers: HttpHeaders } = {
    headers: new HttpHeaders({ "Content-Type": "application/json"}),
  };


  constructor(
    private http: HttpClient,
     private errorHandlerService: ErrorHandlerService,
     private router: Router, private tokenStorage: TokenStorageService) {

  }

  signup(user: Omit<User, "id">): Observable<User>{
    console.log("sign up service")
    return this.http.post<User>(`${this.url}/auth/signup`, user, this.httpOptions).pipe(first(), catchError(this.errorHandlerService.handleError<User>("signup")));
  }

  login(
    email: Pick<User, "email">,
    password: Pick<User, "password">
  ): Observable<any>
  {
    console.log("login service")
    return this.http
      .post(`${this.url}/auth/login`, { email, password }, this.httpOptions)
  }
}
