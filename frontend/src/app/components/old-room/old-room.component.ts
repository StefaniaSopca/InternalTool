import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { ChatService } from 'src/app/services/chat.service';
import { HomeService } from 'src/app/services/home.service';
import { RoomService } from 'src/app/services/room.service';
import { ShowMenuService } from 'src/app/services/show-menu.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

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
  _flagRoom :any;
  _flagUserRoom: any;
  auxialiarFlag!: any;
  constructor(private homeService: HomeService, private tokenService: TokenStorageService, private roomService: RoomService, chatService: ChatService,private authService: AuthService, private showMenu: ShowMenuService, private router: Router) { }

  ngOnInit(): void {
    this.email = sessionStorage.getItem('auth-email')!;

    this.subscription= this.roomService.joinRoom(this.email)
    .pipe(tap(arr => console.log(arr)))
    .subscribe (async arr =>{
      if(arr.arr == 0)
      {
        this.flagRooms = true; //nicio camera
      //   console.log("nada")
      //   setTimeout(() => {
      //     this.router.navigate(['/new-room']);
      // }, 5000);
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

  myFunc(roomNo: string): void
  {
    console.log("am ales ", roomNo);
    this.roomService.saveRoomNo(roomNo);
    this.homeService.isAdmin(this.tokenService.getEmail(), this.roomService.getCurrentRoomNo() ).subscribe(data =>{this.auxialiarFlag = data as boolean, this.homeService.setIsAdminValue(this.auxialiarFlag.ok)})
    //this.homeService.isAdmin(this.tokenService.getEmail(), this.roomService.getCurrentRoomNo() ).subscribe(data =>{ this.homeService.isAdminBool = data})


  }

  goBack(){
    this.router.navigate(['/room'])
  }


  newRoomEnter(){
    console.log("new room entered: ", this.roomEntered.value.newRoom)
    this.roomService.findRoom(this.roomEntered.value.newRoom)
      .subscribe(data=>{this._flagRoom = data; console.log("data", this._flagRoom.ok);
      if( this._flagRoom.ok == true) {
        console.log("data 1")
        this.roomService.saveRoomNo(this.roomEntered.value.newRoom);
        this.roomService.findRoomUser(this.tokenService.getEmail(), this.roomEntered.value.newRoom).subscribe(d=> {this._flagUserRoom = data; console.log("interior", d);
        if(this._flagUserRoom == false) { this.roomService.createRoom(this.email, this.roomEntered.value.newRoom).subscribe();}})

  }
  else{ alert("The team does not exist!")}});

  }
}
