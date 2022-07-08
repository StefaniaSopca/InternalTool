import { Component, OnInit, ViewChild } from '@angular/core';
import { RoomService } from 'src/app/services/room.service';
import { TokenService } from 'src/app/services/token.service';
import { UserService } from 'src/app/services/users.service';
import { tap } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { MatTable } from '@angular/material/table';
import { AlertComponent } from '../alert/alert.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: any=[];
  constructor(private dialog: MatDialog,private roomService: RoomService, private userService: UserService, private tokenStorageService: TokenService ) { }
  subscription!: Subscription;
  displayedColumns: string[] = ['email', 'delete'];
  clickedRows = new Set<String>();
  @ViewChild(MatTable) table!: MatTable<any>;
  ngOnInit(): void {

  this.userService.getUsers(this.tokenStorageService.getEmail(), this.roomService.getCurrentRoomNo() )
    .pipe(tap(emails => console.log(emails)))
    .subscribe (emails =>{
              if(emails == 0)
              {
                this.openDialog();
              }
              else
                { this.users.push(emails); console.log(this.users)}}
              )
  }

  openDialog(): void {
    this.dialog.open(AlertComponent, {
       width: '250px',
       data: "Tell your teammates to join your room!"
     })
       setTimeout(() =>
     {
    },
     5000);
   }

  delete(email: string) {
    console.log("delete email: " + email)
    this.userService.deleteUser(email, this.roomService.getCurrentRoomNo()).subscribe(data=>{

      console.log(data)})

    this.users[0].emails.forEach((value: { email: string; }, index: any) =>{
      if(value.email == email)  this.users[0].emails.splice(index, 1);
    })
    console.log("after", this.users[0].emails)
    this.table.renderRows();
  }
}
