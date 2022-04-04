import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ShowMenuService } from 'src/app/services/show-menu.service';

@Component({
  selector: 'app-new-room',
  templateUrl: './new-room.component.html',
  styleUrls: ['./new-room.component.css']
})
export class NewRoomComponent implements OnInit {

  roomForm!: FormGroup;
  displayedMenu = false;
  constructor(private showMenu: ShowMenuService, private router: Router) { }
  clicked=false;
  ngOnInit(): void {
    this.clicked=true;
    var r= Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
    const code = document.getElementById('code');
    if( code != null)
      code.innerHTML = r.toString();
  }

  joinYourTeam(){
    this.showMenu.setDisplayedMenu(true);
    console.log("joined DAR NU FAC NIMIC IN BACKEND");
    this.router.navigate(['/home'])
  }




}
