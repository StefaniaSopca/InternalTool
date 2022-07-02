import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pending',
  templateUrl: './pending.component.html',
  styleUrls: ['./pending.component.css']
})
export class PendingComponent implements OnInit {

  requestsOn: boolean = false;
  usersOn: boolean = false;
  constructor() { }

  ngOnInit(): void {
  }

  requests(){
    this.usersOn = false;
    this.requestsOn = true;
  }

  users(){
    this.usersOn = true;
    this.requestsOn = false;
  }

}
