import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit {
  roomForm!: FormGroup;
  displayedMenu = false;
  constructor( private router: Router) { }
  clicked=false;

  ngOnInit(): void {
  }

  generateRoomCode(){
    this.router.navigate(['/new-room'])
  }

  joinYourTeam(){
    this.router.navigate(['/old-room'])
  }
}
