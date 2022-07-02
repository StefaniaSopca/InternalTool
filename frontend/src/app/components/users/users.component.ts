import { Component, OnInit, ViewChild } from '@angular/core';
import { RoomService } from 'src/app/services/room.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { UserService } from 'src/app/services/users.service';
import { delay, map, tap } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { MatTable } from '@angular/material/table';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: any=[];
  constructor(private roomService: RoomService, private userService: UserService, private tokenStorageService: TokenStorageService ) { }
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
                console.log("nada")
              //   setTimeout(() => {

              //     this.router.navigate(['/home']);
              // }, 5000);
              }
              else
                { this.users.push(emails); console.log(this.users)}}
              )
  }

  delete(email: string) {
    console.log("delete email: " + email)
    this.userService.deleteUser(email).subscribe(data=>{console.log(data)})
    // this.userService.getUsers(this.tokenStorageService.getEmail(), this.roomService.getCurrentRoomNo() )
    // .pipe(tap(emails => console.log(emails)))
    // .subscribe (emails =>{
    //           if(emails == 0)
    //           {
    //             console.log("nada")
    //           //   setTimeout(() => {

    //           //     this.router.navigate(['/home']);
    //           // }, 5000);
    //           }
    //           else
    //             { this.users.push(emails); console.log(this.users)}}
    //           )

    const index = this.users[0].emails.indexOf(email, 0);
    if (index > -1) {
      this.users[0].emails.splice(index, 1);
    }
    console.log("after", this.users[0].emails)
    this.table.renderRows();
  }
}
