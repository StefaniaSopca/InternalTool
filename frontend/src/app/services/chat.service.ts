import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { io, Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private socket: Socket;
  private url='http://localhost:3000';

  roomNo!: number;
  logout: boolean = false;
  httpOptions: { headers: HttpHeaders } = {
    headers: new HttpHeaders({ "Content-Type": "application/json"}),
  };

  addUsersFlag = new Subject<string>();

  constructor( private http: HttpClient,) {
    this.socket = io(this.url);
   }

   joinRoom(data: any):void{
     this.socket.emit('join', data);
   }

   sendMessage(data: any):void{
    this.socket.emit('message', data);
  }

  getMessage(): Observable<any>
  {
    return  new Observable<{user: string, message: string}>(observer =>{
      this.socket.on('new message', (data) =>{
        observer.next(data);
      });

      return () => {this.socket.disconnect()};
    });
  }

  pressedChat(username: string, roomNo: number): Observable<any> {
    console.log("logout : ", this.logout)
    return this.http.post(`${this.url}/auth/addUsers`, {username, roomNo})
  }

  pressedChatUpdate(username: string, roomNo: number): Observable<string[]> {
    console.log("logout : ", this.logout)
    console.log(" return http", username, roomNo)
    return this.http.post<string[]>(`${this.url}/auth/addUsers`, {username, roomNo})

  }

  getLogout(): boolean{
    return this.logout;
  }

  setLogout(logout: boolean){
    
    this.logout = logout;
  }


  setRoom(roomNo: number) { this.roomNo = roomNo;}
  getRoom(): number{return this.roomNo}

  // getStorage() {
  //   const storage: string = localStorage.getItem('chats')!;
  //   return storage ? JSON.parse(storage) : [];
  // }

  // setStorage(data: any) {
  //   localStorage.setItem('chats', JSON.stringify(data));
  // }
}
