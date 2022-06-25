import { Component, Input, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { delay, map, tap } from 'rxjs/operators';
import { io } from 'socket.io-client';
import { AuthService } from 'src/app/services/auth.service';
import { ChatService } from 'src/app/services/chat.service';


//const SOCKET_ENDPOINT = 'localhost:3000';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

//   socket: any;
//   message!: string;
//   username!: string;
//   subscription!: Subscription;
//   addUsersFlag: any=[];
//   roomNo!: number;

//   constructor(private chatService: ChatService, private router: Router) { }
   ngOnInit() {}
//     this.setupSocketConnection();
//     console.log(this.addUsersFlag);
//     this.username = sessionStorage.getItem('auth-user')!;
//     this.roomNo = this.chatService.getRoom()

//     this.subscription= this.chatService.pressedChat(this.username, this.roomNo)
//       .pipe(tap(arr => console.log(arr)))
//       .subscribe (async arr =>{
//         if(arr.arr == 0)
//         {
//           console.log("nada")
//           setTimeout(() => {

//             this.router.navigate(['/home']);
//         }, 5000);
//         }
//         else
//           { this.addUsersFlag.push(...arr.arr);}}
//         )
//     console.log("flag " , this.addUsersFlag);
//   }

//   ngOnDestroy(): void {
//     console.log("destroy chat component")
//   }

//   setupSocketConnection() {
//     this.socket = io(SOCKET_ENDPOINT);
//     this.socket.on('message-broadcast', (data: string) => {
//     if (data) {
//      const element = document.createElement('li');
//      element.innerHTML = data;
//      element.style.background = 'white';
//      element.style.padding =  '15px 30px';
//      element.style.margin = '10px';
//      document.getElementById('message-list')!.appendChild(element);
//      }
//    });
//  }


//   SendMessage() {
//     this.socket.emit('message', this.message);
//    const element = document.createElement('li');
//    element.innerHTML = this.message;
//    element.style.background = 'white';
//    element.style.padding =  '15px 30px';
//    element.style.margin = '10px';
//    element.style.textAlign = 'right';
//    document.getElementById('message-list')!.appendChild(element);
//    this.message = '';
//  }
}
function getRoom(username: string): number {
  throw new Error('Function not implemented.');
}

