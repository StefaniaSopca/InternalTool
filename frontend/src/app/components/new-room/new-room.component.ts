import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';
import { ShowMenuService } from 'src/app/services/show-menu.service';

@Component({
  selector: 'app-new-room',
  templateUrl: './new-room.component.html',
  styleUrls: ['./new-room.component.css']
})
export class NewRoomComponent implements OnInit {

  roomForm!: FormGroup;
  displayedMenu = false;
  constructor(private authService: AuthService, private showMenu: ShowMenuService, private router: Router) { }
  clicked=false;
  email!: string;
  r = 0;
  ngOnInit(): void {
    this.clicked=true;

    this.r= Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
    const code = document.getElementById('code');
    if( code != null)
      code.innerHTML = this.r.toString();
  }

  joinYourTeam():void{
    this.showMenu.setDisplayedMenu(true);
    console.log("new room " + this.r)
    this.email = sessionStorage.getItem('auth-email')!;
    this.authService.createRoom(this.email, this.r).subscribe((msg)=>{this.router.navigate(['/home']), console.log(msg)})
  }



}
