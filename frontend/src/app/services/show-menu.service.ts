import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ShowMenuService {

  constructor() { }
  displayedMenu = false;

  getDisplayedMenu() { return this.displayedMenu; }

  setDisplayedMenu(displayedMenu: boolean)
  {
    console.log('setDisplayedMenu pe ', this.displayedMenu);
    this.displayedMenu = !!displayedMenu;
    console.log('setDisplayedMenu dupa pe', this.displayedMenu);
  }
}
