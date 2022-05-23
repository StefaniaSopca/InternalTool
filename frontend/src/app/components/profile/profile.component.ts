import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  currentEmail: any;
  currentToken : any;
  constructor(private token: TokenStorageService) { }

  ngOnInit(): void {

    this.currentEmail = this.token.getEmail();
    this.currentToken = this.token.getToken();
  }
}
