import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { HomeService } from 'src/app/services/home.service';
import { RoomService } from 'src/app/services/room.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  created: any = 0;
  user: string = "";

  constructor(private roomService: RoomService,private homeService: HomeService, private http: HttpClient, private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {
    this.user = this.tokenStorage.getUser();
    var email =this.tokenStorage.getEmail()
    var roomNo = this.roomService.getCurrentRoomNo();
    console.log("Email front: ", email, roomNo);
    this.homeService.noEvents(email, roomNo)
      .subscribe(data => { this.created = data; console.log("numero:", this.created[0]["no"]);});
  }


  // component has a prop named count
  // the page has a button
  // on button click call a function
  // the function returns the next value ( ++)
  // does the UI updated the value when u click the button?


}
