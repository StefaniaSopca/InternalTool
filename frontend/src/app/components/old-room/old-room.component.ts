import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { ChatService } from 'src/app/services/chat.service';
import { RoomService } from 'src/app/services/room.service';
import { ShowMenuService } from 'src/app/services/show-menu.service';

@Component({
  selector: 'app-old-room',
  templateUrl: './old-room.component.html',
  styleUrls: ['./old-room.component.css']
})
export class OldRoomComponent implements OnInit {
  roomForm!: FormGroup;
  displayedMenu = false;
  constructor(private roomService: RoomService, chatService: ChatService,private authService: AuthService, private showMenu: ShowMenuService, private router: Router) { }
  clicked=false;
  email!: string;
  subscription!: Subscription;
  socket: any;
  listRooms: any=[];
  r = 0;
  ngOnInit(): void {
    this.email = sessionStorage.getItem('auth-email')!;
    this.subscription= this.authService.joinRoom(this.email)
    .pipe(tap(arr => console.log(arr)))
    .subscribe (async arr =>{
      if(arr.arr == 0)
      {
        console.log("nada")
        setTimeout(() => {

          this.router.navigate(['/home']);
      }, 5000);
      }
      else
        { this.listRooms.push(...arr.arr);}}
      )
    this.roomForm = this.createFormGroup();
  }


  createFormGroup() : FormGroup
  {
    return new FormGroup({
      roomCode: new FormControl("", [Validators.required, Validators.minLength(4), Validators.maxLength(4)]),
    });
  }

  myFunc(roomNo: number): void
  {
    console.log("am ales ", roomNo);
    this.roomService.saveRoomNo(roomNo);
  }

  // joinYourTeam(){
  //   this.showMenu.setDisplayedMenu(true);
  //   console.log("old room " + this.roomForm.get('roomCode')?.value);
  //   this.r = this.roomForm.get('roomCode')?.value;
  //   this.email = sessionStorage.getItem('auth-email')!;
  //   this.authService.joinRoom(this.email, this.r).subscribe((msg: any)=>{this.router.navigate(['/home']), console.log(msg)})
  //   this.chatService.setRoom(this.r);
  // }


}
