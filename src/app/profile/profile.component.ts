import { Component } from '@angular/core';

import { Todo } from '../todos/todo.model';

import { ContactService } from '../layout/contact-list/contact.service';
import { ProfileService } from './profile.service';
import { AuthService } from '../auth/auth.service';

@Component ({
	selector: 'profile-component',
	templateUrl: './profile.component.html',
	styleUrls: [String('./profile.component.sass')]
})

export class ProfileComponent {
	constructor(private authService: AuthService, private contactService: ContactService, private profileService: ProfileService){}

	setTodoYear(todo: Todo){
		return(new Date(todo.deadline).getFullYear());
	}

	setTodoMonth(todo: Todo){
		return(new Date(todo.deadline).getMonth())
	}

	setTodoDay(todo: Todo){
		return(new Date(todo.deadline).getDate())
	}

	toggleSubtasks(){

	}
}
