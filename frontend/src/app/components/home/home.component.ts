
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HomeService } from 'src/app/services/home.service';
import { RoomService } from 'src/app/services/room.service';
import { TokenService } from 'src/app/services/token.service';
import { AlertComponent } from '../alert/alert.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  created: any = 0;
  user: string = "";
  roomNo: string = "";
  constructor(public dialog: MatDialog, private roomService: RoomService,private homeService: HomeService,  private tokenStorage: TokenService) { }

  ngOnInit(): void {
    this.user = this.tokenStorage.getUser();
    var email =this.tokenStorage.getEmail()
    this.roomNo = this.roomService.getCurrentRoomNo();
    console.log("Email front: ", email, this.roomNo);
    this.homeService.noEvents(email, this.roomNo)
      .subscribe(data => { this.created = data; console.log("numero:", this.created[0]["no"]);},
                err => { this.openDialog(); }

      );

  }

  openDialog(): void {
     this.dialog.open(AlertComponent, {
        width: '250px',
        data: "There is a problem with Home Page. Please try again."
      })

        setTimeout(() =>
      {

     },
      5000);


    }

}
