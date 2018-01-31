import { Component } from '@angular/core';

import { ProfileService } from '../../profile/profile.service';

@Component ({
	selector: 'header-component',
	templateUrl: './header.component.html',
	styleUrls: [String('./header.component.sass')]
})

export class HeaderComponent {
  showingMenu: boolean = false;

	constructor(private profileService: ProfileService){}

  toggleMenu(){
    this.showingMenu = !this.showingMenu;
  }

	showHideProfile(){
		this.profileService.showHide();
	}
}
