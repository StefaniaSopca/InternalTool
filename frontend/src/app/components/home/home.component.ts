import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/services/events.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private http: HttpClient,private eventService: EventService, private tokenStorage: TokenStorageService) { }
  created: any = 0;
  user: string = "";
  ngOnInit(): void {
    this.user = this.tokenStorage.getUser();
    var email =this.tokenStorage.getEmail()
    console.log("Email front: ", email)
   this.http.get(`http://localhost:3000/auth/getNoEvents`, {params:{email: email}}).subscribe(data => { this.created = data; console.log("numero:", this.created[0]["no"]); });

  }


  // component has a prop named count
  // the page has a button
  // on button click call a function
  // the function returns the next value ( ++)
  // does the UI updated the value when u click the button?
  

}
