import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})

export class UserService {
  //private socket: Socket;
  private url='http://localhost:3000/scheduler';

  constructor( private http: HttpClient){}

  public getUsers(email:string, roomNo: string){
    return this.http.get(`${this.url}/getUsers`, {params:{email: email, roomNo: roomNo}})
  }

  public deleteUser(email:string, roomNo: string){
    return this.http.delete(`${this.url}/deleteUser`, {params:{email: email, roomNo: roomNo}});
  }

}
