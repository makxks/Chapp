import { Component, Input, OnInit } from '@angular/core';

import { ProfileService } from '../profile/profile.service';

import { Todo } from './todo.model';
import { User } from '../auth/user.model';

@Component ({
	selector: 'todo-component',
	templateUrl: './todo.component.html',
	styleUrls: [String('./todo.component.sass')]
})

export class TodoComponent implements OnInit {
	@Input() todo: Todo;

	constructor(private profileService: ProfileService){}

	year: any;
	month: any;
	date: any;

	ngOnInit(){
		this.year = new Date(this.todo.deadline).getFullYear();
		this.month = new Date(this.todo.deadline).getMonth();
		this.date = new Date(this.todo.deadline).getDate();
	}

	checkUser(){
		for(var i=0; i<this.todo.users.length;i++){
			if(this.profileService.currentUser == this.todo.users[i]){
				return true;
			}
		}
		return false;
	}
}
