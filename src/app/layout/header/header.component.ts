import { Component } from '@angular/core';

@Component ({
	selector: 'header-component',
	templateUrl: './header.component.html',
	styleUrls: [String('./header.component.sass')]
})

export class HeaderComponent {
  showingMenu: boolean = false;

  toggleMenu(){
    this.showingMenu = !this.showingMenu;
  }
}
