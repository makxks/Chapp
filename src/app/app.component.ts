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
		}

		ngOnInit(){
		}
}
