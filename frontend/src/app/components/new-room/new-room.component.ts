import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RoomService } from 'src/app/services/room.service';
import { ShowMenuService } from 'src/app/services/show-menu.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-new-room',
  templateUrl: './new-room.component.html',
  styleUrls: ['./new-room.component.css']
})
export class NewRoomComponent implements OnInit {

  roomEntered!: FormGroup;
  roomForm!: FormGroup;
  displayedMenu = false;
  clicked=false;
  _email!: string;
  _roomNo = "";
  _flagRoom :any;

  constructor(private _tokenService: TokenService,private _roomService: RoomService, private _showMenu: ShowMenuService, private _router: Router) { }

  ngOnInit(): void {
    this.clicked=true;
    //Todo
    //request backend to verify if the new number exists already
    //if it exists, generate another one
    // this._roomNo= Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
    // const code = document.getElementById('code');

    // if( code != null)
    //   code.innerHTML = this._roomNo.toString();

    this.roomEntered = this.createFormGroup();
  }

  joinYourTeam():void{
    this._showMenu.setDisplayedMenu(true);
    console.log("new room " + this._roomNo)
    this._email = sessionStorage.getItem('auth-email')!;
    this._roomService.createRoom(this._email, this._roomNo)
      .subscribe((msg)=>{this._router.navigate(['/home']), console.log(msg)})

    this._roomService.saveRoomNo(this._roomNo)
  }

  createFormGroup() : FormGroup
  {
    return new FormGroup({
      newRoom: new FormControl("", [Validators.required, Validators.minLength(4), Validators.maxLength(4)]),
    });
  }

  goBack(){
    this._router.navigate(['/room'])
  }


  newRoomEnter(){
    console.log("new room entered: ", this.roomEntered.value.newRoom)
    this._roomService.findRoom(this.roomEntered.value.newRoom)
      .subscribe(data=> {this._flagRoom = data; console.log("data", this._flagRoom.ok);
        if( this._flagRoom.ok == false) {
          console.log("data 1")
        this._roomService.saveRoomNo(this.roomEntered.value.newRoom);
        this._roomService.createRoom(this._tokenService.getEmail(), this.roomEntered.value.newRoom).subscribe();
        this._roomService.saveAdmin(this._tokenService.getEmail(), this.roomEntered.value.newRoom).subscribe(data=>{console.log(data)});
    }
    else{
      alert("The name is already used.")
    }})

  }

}
