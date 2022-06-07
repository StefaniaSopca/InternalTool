import { Component, OnInit } from '@angular/core';
import { RoomService } from 'src/app/services/room.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  currentUser: any;
  currentToken : any;
  roomNo: number =0;
  constructor(private token: TokenStorageService, private roomService: RoomService) { }

  ngOnInit(): void {
    this.roomNo = this.roomService.getCurrentRoomNo();
    this.currentUser = this.token.getUser();
    this.currentToken = this.token.getToken();
  }
}
