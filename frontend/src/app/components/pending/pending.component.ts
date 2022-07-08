import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AlertComponent } from '../alert/alert.component';

@Component({
  selector: 'app-pending',
  templateUrl: './pending.component.html',
  styleUrls: ['./pending.component.css']
})
export class PendingComponent implements OnInit {

  requestsOn: boolean = false;
  usersOn: boolean = false;

  constructor(public dialog: MatDialog, private router: Router) { }

  ngOnInit(): void {
  }

  openDialog(): void {
  this.usersOn = false;
  this.requestsOn = true;
  console.log("flagsss", this.usersOn, this.requestsOn)
  //  this.dialog.open(AlertComponent, {
  //     width: '250px',
  //     data: "New feature soon"
  //   })

  //     setTimeout(() =>
  //   {
  //   this.users();
  //  },
  //   5000);

  //   console.log("flags", this.usersOn, this.requestsOn)
  }



  requests(){

  }

  users(){

    this.usersOn = true;
    this.requestsOn = false;
    console.log("flags", this.usersOn, this.requestsOn)
  }

}
