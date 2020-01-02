import { Component, OnInit } from '@angular/core';

import { ProfileService } from './profile/profile.service';
import { AuthService } from './auth/auth.service';
import { ChatService } from './chat/chat.service';
import { NotificationService } from './notifications/notification.service';
import { ContactService } from './layout/contact-list/contact.service';
import { TodoService } from './todos/todo.service';

import { User } from './auth/user.model';

@Component ({
	selector: 'my-app',
	templateUrl: './app.component.html',
	styleUrls: [String('./app.component.sass')]
})

export class AppComponent implements OnInit {
	constructor(
		private profileService: ProfileService,
		private authService: AuthService,
		private chatService: ChatService,
		private notificationService: NotificationService,
		private contactService: ContactService,
		private todoService: TodoService){
			authService.handleAuthentication();
			authService.scheduleRenewal();
		}

		ngOnInit(){
			if(this.authService.isAuthenticated()){
				this.authService.renewTokens();
			}
		}

		setUserMax(){
			var max = new User(
				"Max", "someemailMax", [], [], []
			);
			this.profileService.setUser(max);
			this.authService.userIsLoggedIn = true;
		}

		setUserTom(){
			var tom = new User(
				"Tom", "someemailTom", [], [], []
			);
			this.profileService.setUser(tom);
			this.authService.userIsLoggedIn = true;
		}

		setUserLucie(){
			var lucie = new User(
				"Lucie", "someemailLucie", [], [], []
			);
			this.profileService.setUser(lucie);
			this.authService.userIsLoggedIn = true;
		}
}
