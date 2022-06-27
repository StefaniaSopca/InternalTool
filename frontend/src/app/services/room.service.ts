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
  private url='http://localhost:3000';

  listRooms = new Subject<string>();

  currentRoomNo: string = "";
  constructor( private http: HttpClient, private router: Router) {
    //this.socket = io(this.url);
   }

  // rooms(email: string): Observable<any>{
  //   return this.http.post(`${this.url}/auth/joinRoom`, {email})
  // }

  saveRoomNo(roomNo: string): void{
    console.log("save room no: ", roomNo);
    this.currentRoomNo = roomNo;
    this.router.navigate(['/home']);
  }

  getCurrentRoomNo(): string{
    console.log("get room no: ", this.currentRoomNo);
    return this.currentRoomNo;}

  createRoom(email: string, roomNo: string): Observable<any>{
    console.log("create room service", email, roomNo);

    return this.http.post<number>(`${this.url}/auth/createRoom`, {email, roomNo})
  }


  joinRoom(email: string): Observable<any>{
    console.log("join room service")

    return this.http.post<number>(`${this.url}/auth/joinRoom`, {email})
  }

  findRoom(roomNo: string){
    return this.http.get(`${this.url}/auth/findRoom`, {params:{roomNo:roomNo}})
  }

  saveAdmin(email: string, roomNo: string){
    console.log("save admin params: ", email, roomNo)
    return this.http.post(`${this.url}/auth/saveAdmin`, {email, roomNo})
  }

  findRoomUser(email: string, roomNo: string){
    return this.http.post(`${this.url}/auth/findRoomUser`, {email, roomNo})
  }

}
