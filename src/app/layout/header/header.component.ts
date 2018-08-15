import { Component } from '@angular/core';

import { ProfileService } from '../../profile/profile.service';

@Component ({
	selector: 'header-component',
	templateUrl: './header.component.html',
	styleUrls: [String('./header.component.sass')]
})

export class HeaderComponent {
	constructor(private profileService: ProfileService){}

	showHideProfile(){
		this.profileService.showHide();
	}
}
