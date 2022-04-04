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
   // this.roomForm = this.createFormGroup();
  }
  // createFormGroup() : FormGroup
  // {
  //   return new FormGroup({
  //     roomCode: new FormControl("", [Validators.required, Validators.minLength(4), Validators.maxLength(4)]),

  //   });
  //}


  // getRoom(){
  //   this.showMenu.setDisplayedMenu(true);
  //   console.log("joined");

  // }

  generateRoomCode(){
    this.router.navigate(['/new-room'])
    // this.clicked=true;
    // var r= Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
    // const code = document.getElementById('code');
    // if( code != null)
    //   code.innerHTML = r.toString();
  }

  joinYourTeam(){
    this.router.navigate(['/old-room'])
  }


}
