import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit {
  roomForm!: FormGroup;
  constructor() { }
  clicked=false;
  ngOnInit(): void {
    this.roomForm = this.createFormGroup();
  }
  createFormGroup() : FormGroup
  {
    return new FormGroup({
      roomCode: new FormControl("", [Validators.required, Validators.minLength(4), Validators.maxLength(4)]),

    });
  }


  getRoom(){
    console.log("joined");
  }

  generateRoomCode(){
    this.clicked=true;
    var r= Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
    const code = document.getElementById('code');
    if( code != null)
      code.innerHTML = r.toString();
  }


}
