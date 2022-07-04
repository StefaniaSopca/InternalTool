import { Injectable } from '@angular/core';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';
const USER_EMAIL = 'auth-email';
@Injectable({
  providedIn: 'root'
})
export class TokenService {
  constructor() { }

  logout(): void {
    window.sessionStorage.clear();
  }

  public saveToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    console.log("saveuser ",token)
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string | null {
    return window.sessionStorage.getItem(TOKEN_KEY);
  }

  public saveUser(user: any): void {
    window.sessionStorage.removeItem(USER_KEY);
    console.log("saveuser ", user)
    window.sessionStorage.setItem(USER_KEY, user);
  }

  public getUser(): any {
    var user = window.sessionStorage.getItem(USER_KEY);

    if (user) {
      return user;
    }

    return {};
  }


  public saveEmail(email: any): void {
    window.sessionStorage.removeItem(USER_EMAIL);
    console.log("saveemail ", email)
    window.sessionStorage.setItem(USER_EMAIL, email);
  }

  public getEmail(): any {
    var email = window.sessionStorage.getItem(USER_EMAIL);

    if (email) {
      return email;
    }

    return {};
  }
}
