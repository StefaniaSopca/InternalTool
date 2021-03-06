import { Component, OnInit } from '@angular/core';
import { RoomService } from 'src/app/services/room.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  currentUser: any;
  currentToken : any;
  roomNo: string ="";
  constructor(private token: TokenService, private roomService: RoomService) { }

  ngOnInit(): void {
    this.roomNo = this.roomService.getCurrentRoomNo();
    console.log("local " ,this.roomNo);
    this.currentUser = this.token.getUser();
    this.currentToken = this.token.getToken();
  }
}
