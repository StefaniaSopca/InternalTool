import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ShowMenuService } from 'src/app/services/show-menu.service';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit {
  roomForm!: FormGroup;
  displayedMenu = false;
  constructor(private showMenu: ShowMenuService, private router: Router) { }
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
