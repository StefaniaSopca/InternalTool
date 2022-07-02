import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from './token-storage.service';


@Injectable({
  providedIn: 'root'
})

export class UserService {
  //private socket: Socket;
  private url='http://localhost:3000';

  constructor( private http: HttpClient){}

  public getUsers(email:string, roomNo: string){
    return this.http.get(`${this.url}/auth/getUsers`, {params:{email: email, roomNo: roomNo}})
  }

  public deleteUser(email:string){
    return this.http.delete(`${this.url}/auth/deleteUser`, {params:{email: email}});
  }

}
