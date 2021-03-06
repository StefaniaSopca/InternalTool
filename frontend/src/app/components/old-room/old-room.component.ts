import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { HomeService } from 'src/app/services/home.service';
import { RoomService } from 'src/app/services/room.service';
import { TokenService } from 'src/app/services/token.service';

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
  newFlag: boolean = false;
  err: string = "";
  errFlag: boolean = false;
  constructor(private homeService: HomeService, private tokenService: TokenService, private roomService: RoomService, private router: Router) { }

  ngOnInit(): void {
    this.email = sessionStorage.getItem('auth-email')!;
    this.err = "";
    this.errFlag = false;
    this.subscription= this.roomService.joinRoom(this.email)
    .pipe(tap(room => console.log(room)))
    .subscribe (async room =>{
      if(room.arr == 0)
      {
        this.flagRooms = true; //nicio camera
      }
      else
        { this.flagRooms = false;
          this.listRooms.push(...room.arr);}}
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

  selectedRoom(roomNo: string): void
  {
    console.log("am ales ", roomNo);
    this.roomService.saveRoomNo(roomNo);
    this.homeService.isAdmin(this.tokenService.getEmail(), this.roomService.getCurrentRoomNo() )
      .subscribe(data =>{this.auxialiarFlag = data as boolean, this.homeService.setIsAdminValue(this.auxialiarFlag.ok)})
  }

  goBack(){
    this.router.navigate(['/room'])
  }


  newRoomEnter(){
    console.log("new room entered: ", this.roomEntered.value.newRoom)
    this.roomService.findRoom(this.roomEntered.value.newRoom)
      .subscribe(data=>{this._flagRoom = data; console.log("data", this._flagRoom.ok);

      if( this._flagRoom.ok == true) { //exista camera in baza de date
        for(let i=0; i<this.listRooms.length; i++){
          console.log(this.listRooms[i], this.roomEntered.value.newRoom)
          if(this.listRooms[i] === this.roomEntered.value.newRoom)//exista camera in lista din interfata
            this.newFlag = true;
        }
        console.log("data 1 ", this.listRooms, this.newFlag, this.roomEntered.value.newRoom)
        if( this.newFlag == false) //nu exista camera in lista din interfata
        {
          this.roomService.saveRoomNo(this.roomEntered.value.newRoom); //salvare local camera
          this.roomService.findRoomUser(this.tokenService.getEmail(), this.roomEntered.value.newRoom)
            .subscribe(d=> {this._flagUserRoom = d; console.log("interior", d);
              if(this._flagUserRoom.ok == false) //nu e in DB
              {
                this.roomService.createRoom(this.email, this.roomEntered.value.newRoom).subscribe();
              }

            })
        }
        else
        {
          this.selectedRoom(this.roomEntered.value.newRoom)
        }

  }
  else{ this.err = "The team does not exist!"; this.errFlag = true;}});

  }
}
