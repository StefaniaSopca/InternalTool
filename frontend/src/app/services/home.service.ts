import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { io, Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})

export class HomeService {
  //private socket: Socket;
  private url='http://localhost:3000';

  constructor(private http: HttpClient){}

  noEvents(email:string, roomNo: number){
    console.log("noEventsss", roomNo);
    return this.http.get(`http://localhost:3000/auth/getNoEvents`, {params:{email: email, roomNo: roomNo}})
  }

}
