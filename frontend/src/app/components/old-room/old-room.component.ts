import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ShowMenuService } from 'src/app/services/show-menu.service';

@Component({
  selector: 'app-old-room',
  templateUrl: './old-room.component.html',
  styleUrls: ['./old-room.component.css']
})
export class OldRoomComponent implements OnInit {
  roomForm!: FormGroup;
  displayedMenu = false;
  constructor(private showMenu: ShowMenuService, private router: Router) { }
  clicked=false;
  ngOnInit(): void {
    this.roomForm = this.createFormGroup();
  }
  createFormGroup() : FormGroup
  {
    return new FormGroup({
      roomCode: new FormControl("", [Validators.required, Validators.minLength(4), Validators.maxLength(4)]),

    });
  }
  joinYourTeam(){
    this.showMenu.setDisplayedMenu(true);
    console.log("joined DAR NU FAC NIMIC IN BACKEND");
    this.router.navigate(['/home'])
  }


}
