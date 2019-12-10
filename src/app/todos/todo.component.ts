import { Component, Input, OnInit } from '@angular/core';

import { ProfileService } from '../profile/profile.service';
import { TodoService } from './todo.service';

import { Todo } from './todo.model';
import { User } from '../auth/user.model';

@Component ({
	selector: 'todo-component',
	templateUrl: './todo.component.html',
	styleUrls: [String('./todo.component.sass')]
})

export class TodoComponent implements OnInit {
	@Input() todo: Todo;
	subTasksShowing: boolean = false;

	constructor(private profileService: ProfileService, private todoService: TodoService){}

	ngOnInit(){
	}

	getYear(deadline: number){
		return new Date(deadline).getFullYear()
	}

	getMonth(deadline: number){
		var month;
		month = new Date(deadline).getMonth();
		if(month == 0) {
			return 12;
		}
		else {
			return new Date(deadline).getMonth();
		}
	}

	getDay(deadline: number){
		return new Date(deadline).getDate()
	}

	checkUser(){
		for(var i=0; i<this.todo.users.length;i++){
			if(this.profileService.currentUser.email == this.todo.users[i].email){
				return true;
			}
		}
		return false;
	}

	checkSubuser(subTodo:Todo){
		for(var i=0; i<subTodo.users.length;i++){
			if(this.profileService.currentUser.email == subTodo.users[i].email){
				return true;
			}
		}
		return false;
	}

	toggleSubtasks(){
		this.subTasksShowing = !this.subTasksShowing;
	}
}
