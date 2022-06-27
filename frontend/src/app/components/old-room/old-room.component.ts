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
  roomEntered!: FormGroup;
  email!: string;
  subscription!: Subscription;
  listRooms: any=[];
  flagRooms: boolean = false;
  newRoom: number = 0;
  constructor(private roomService: RoomService, chatService: ChatService,private authService: AuthService, private showMenu: ShowMenuService, private router: Router) { }

  ngOnInit(): void {
    this.email = sessionStorage.getItem('auth-email')!;

    this.subscription= this.roomService.joinRoom(this.email)
    .pipe(tap(arr => console.log(arr)))
    .subscribe (async arr =>{
      if(arr.arr == 0)
      {
        this.flagRooms = true; //nicio camera
        console.log("nada")
        setTimeout(() => {
          this.router.navigate(['/new-room']);
      }, 5000);
      }
      else
        { this.flagRooms = false;
          this.listRooms.push(...arr.arr);}}
      )
    this.roomForm = this.createFormGroup();
    this.roomEntered = this.createFormGroup();
  }

  createFormGroup() : FormGroup
  {
    return new FormGroup({
      newRoom: new FormControl("", [Validators.required, Validators.minLength(4), Validators.maxLength(4)]),
    });
  }

  myFunc(roomNo: number): void
  {
    console.log("am ales ", roomNo);
    this.roomService.saveRoomNo(roomNo);
  }

  // goBack(){
  //   this.router.navigate(['/room'])
  // }


  // newRoomEnter(){
  //   console.log("new room entered: ", this.roomEntered.value.newRoom)
  //   this.roomService.saveRoomNo(this.roomEntered.value.newRoom);
  //   this.roomService.createRoom(this.email, this.roomEntered.value.newRoom).subscribe();
  // }
}
