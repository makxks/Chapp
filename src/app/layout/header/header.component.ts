import { Component } from '@angular/core';

import { ProfileService } from '../../profile/profile.service';
import { AuthService } from '../../auth/auth.service';
import { NotificationService } from '../../notifications/notification.service';

@Component ({
	selector: 'header-component',
	templateUrl: './header.component.html',
	styleUrls: [String('./header.component.sass')]
})

export class HeaderComponent {
	constructor(private profileService: ProfileService, private authService: AuthService, private notificationService: NotificationService){}

	showHideNotifications(){
		this.notificationService.showHide();
		if(this.notificationService.showing){
			this.profileService.hide();
		}
	}

	showHideProfile(){
		this.profileService.showHide();
		if(this.profileService.showing){
			this.notificationService.hide();
		}
	}

	login(){
		this.authService.login();
	}

	logout(){
		this.authService.logout();
	}
}
