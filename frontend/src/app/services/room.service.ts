import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { io, Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})

export class RoomService {
  private socket: Socket;
  private url='http://localhost:3000';

  listRooms = new Subject<string>();

  currentRoomNo: number = 0;
  constructor( private http: HttpClient, private router: Router) {
    this.socket = io(this.url);
   }

  // rooms(email: string): Observable<any>{
  //   return this.http.post(`${this.url}/auth/joinRoom`, {email})
  // }

  saveRoomNo(roomNo: number): void{
    this.currentRoomNo = roomNo;
    this.router.navigate(['/home']);
  }

  getCurrentRoomNo(): number{return this.currentRoomNo;}


}
