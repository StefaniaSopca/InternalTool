import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthGuardService } from './services/auth-guards.service';
import { ChatService } from './services/chat.service';
import { HomeService } from './services/home.service';
import { RoomService } from './services/room.service';
import { ShowMenuService } from './services/show-menu.service';
import { TokenService } from './services/token.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private roomService: RoomService, private homeService: HomeService, private authGuards:AuthGuardService, private chatService: ChatService, private showMenu: ShowMenuService,private tokenStorageService: TokenService, private router: Router) {
    // this.chatService.getMessage().subscribe((data: {user:string, message:string}) => {
    //   this.messageArray.push(data);
    // })
   }
  displayedMenu = false;
  //isLoggedIn = false;
  username!: string;
  addUsersFlag!: string;
  roomNo!: string;
  isAdminBool!: boolean;
  auxialiarFlag!: any;
  path_logo: string = "/assets/img/logo.png"
  //username2 = this.tokenStorageService.getUser();
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
    if(this.gets()){
      console.log('init', this.tokenStorageService.getEmail(), this.roomService.getCurrentRoomNo() )
     this.homeService.isAdmin(this.tokenStorageService.getEmail(), this.roomService.getCurrentRoomNo() ).subscribe(data =>{this.auxialiarFlag = data as boolean, this.homeService.setIsAdminValue(this.auxialiarFlag.ok)})
      this.username = this.tokenStorageService.getUser();
      console.log("here", this.username);
      this.addUsersFlag ='Am apasat, se adauga users init';

    }
  }

  ngOnDestroy(): void {
    console.log("destroy app component")
  }

  gets(){
    const user = this.tokenStorageService.getToken();
    this.username = this.tokenStorageService.getUser();
    if( user != null)
      return true;
    else { return false;}
  }

  isAdmin(){
    console.log("admin in app ", this.homeService.getIsAdminValue())
    return this.homeService.getIsAdminValue()
  }

  logout(): void
  {
    this.chatService.setLogout(true);
    this.tokenStorageService.logout();
    window.location.reload();
  }


  addUsers(username: string): void
  {
    // if(this.isLoggedIn)
  //   // {
  //     this.roomNo = this.chatService.getRoom();

  //   // this.addUsersFlag ="Am apasat, se adauga users";
  //     console.log("helo ", username, this.roomNo);

  //    this.chatService.pressedChatUpdate(username, this.roomNo)
  //  //}
  }

  title = 'posts';
  opened= false;
}


