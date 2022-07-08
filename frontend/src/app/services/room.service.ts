import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { io, Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})

export class RoomService {
  //private socket: Socket;
  private url='http://localhost:3000/scheduler';

  listRooms = new Subject<string>();

  currentRoomNo: string = "";
  constructor( private http: HttpClient, private router: Router) {
   }


  saveRoomNo(roomNo: string): void{
    console.log("save room no: ", roomNo);
    this.currentRoomNo = roomNo;
    window.localStorage.setItem('roomNo', roomNo);
    this.router.navigate(['/home']);
  }

  getCurrentRoomNo(): string{
    console.log("get room no: ", this.currentRoomNo);
    return  window.localStorage.getItem('roomNo')!;
  }
  createRoom(email: string, roomNo: string): Observable<any>{
    console.log("create room service", email, roomNo);

    return this.http.post<number>(`${this.url}/createRoom`, {email, roomNo})
  }


  joinRoom(email: string): Observable<any>{
    console.log("join room service")

    return this.http.post<number>(`${this.url}/joinRoom`, {email})
  }

  findRoom(roomNo: string){
    return this.http.get(`${this.url}/findRoom`, {params:{roomNo:roomNo}})
  }

  saveAdmin(email: string, roomNo: string){
    console.log("save admin params: ", email, roomNo)
    return this.http.post(`${this.url}/saveAdmin`, {email, roomNo})
  }

  findRoomUser(email: string, roomNo: string){
    return this.http.post(`${this.url}/findRoomUser`, {email, roomNo})
  }

}
