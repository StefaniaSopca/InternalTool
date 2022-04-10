import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { ChatService } from './services/chat.service';
import { ShowMenuService } from './services/show-menu.service';
import { TokenStorageService } from './services/token-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private chatService: ChatService, private showMenu: ShowMenuService,private tokenStorageService: TokenStorageService) {
    // this.chatService.getMessage().subscribe((data: {user:string, message:string}) => {
    //   this.messageArray.push(data);
    // })
   }
  displayedMenu = false;
  isLoggedIn = false;
  username!: string;
  addUsersFlag!: string;
  roomNo!: number;
  // public roomId!: string;
  // public messageText!: string;
  // public messageArray: { user: string, message: string}[] = [];

  // public phone!: string;
  // public currentUser: any;
  // public selectedUser: any;

  // public userList=[
  //   {
  //     id: 1,
  //     name: 'John',
  //     phone:'899999999',
  //     roomId:{
  //       1:'room-1',
  //       2:'room-2',
  //       3:'room-3',
  //     }
  //   },
  //   {
  //     id: 2,
  //     name: 'Alina',
  //     phone:'233456789',
  //      roomId:{
  //       1:'room-1',
  //       2:'room-2',
  //       3:'room-3',
  //     }

  //   }
  // ];

  ngOnInit(): void {
    //this.displayedMenu = false;
    console.log('get : ', this.displayedMenu);
    if(this.isLoggedIn){
      const user = this.tokenStorageService.getUser();
      this.addUsersFlag ='Am apasat, se adauga users init';
      this.username = user;
    }
  }

  gets(){
    console.log('gets : ', this.displayedMenu);
    this.isLoggedIn = true;
    const user = this.tokenStorageService.getUser();

    this.username = user;
    return this.showMenu.getDisplayedMenu();
  }

  logout(): void
  {
    this.tokenStorageService.signOut();
    window.location.reload();
  }


  addUsers(username: string): void
  {
    this.roomNo = this.chatService.getRoom();

   // this.addUsersFlag ="Am apasat, se adauga users";
   console.log("helo ", username, this.roomNo);
   this.chatService.pressedChatUpdate(username, this.roomNo)
  }
  // selectedUserHandler(phone: string): void{
  //   this.selectedUser = this.userList.find(user => user.phone === phone);
  //   this.roomId = this.selectedUser.roomId[this.selectedUser.id];
  //   this.messageArray = [];

  //   this.join(this.currentUser.name, this.roomId);
  // }

  // join(name: string, roomId: string): void{
  //   this.chatService.joinRoom({user: name, roomId: roomId});
  // }

  // sendMessage(message: string): void{
  //   this.chatService.sendMessage({
  //     data: this.currentUser.name,
  //     room: this.roomId,
  //     message: this.messageText});

  //     this.messageText ='';
  // }



  title = 'posts';
  opened= false;;
}


