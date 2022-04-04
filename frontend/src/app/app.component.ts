import { Component } from '@angular/core';
import { ShowMenuService } from './services/show-menu.service';
import { TokenStorageService } from './services/token-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private showMenu: ShowMenuService,private tokenStorageService: TokenStorageService) { }
  displayedMenu = false;
  isLoggedIn = false;
  username?: string;

  ngOnInit(): void {
    //this.displayedMenu = false;
    console.log('get : ', this.displayedMenu);
    if(this.isLoggedIn){
      const user = this.tokenStorageService.getUser();
     
      this.username = user;
    }
  }

  gets(){
    console.log('gets : ', this.displayedMenu);
    this.isLoggedIn = true;
    const user = this.tokenStorageService.getUser();

    this.username = user;
    return this.showMenu.getDisplayedMenu();
  }

  logout(): void
  {
    this.tokenStorageService.signOut();
    window.location.reload();
  }

  title = 'posts';
  opened= false;;
}


