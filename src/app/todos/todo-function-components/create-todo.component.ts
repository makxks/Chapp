import { Component, OnInit } from '@angular/core';

import { ReactiveFormsModule, FormBuilder, FormGroup, FormControl, Validators } from "@angular/forms";

import { TodoService } from '../todo.service';

import { Todo } from '../todo.model';
import { Chat } from '../../chat/chat.model';
import { User } from '../../auth/user.model';

@Component ({
	selector: 'create-todo',
	templateUrl: './create-todo.component.html',
	styleUrls: [String('./create-todo.component.sass')]
})

export class CreateTodoComponent implements OnInit {
	chat: Chat = new Chat('', null, [], false, []);
	parentTodo: Todo = null;
  display = 'none';
	createTodoForm: FormGroup;
	users: User[] = [];
	selectedUsernames: string[] = [];

  constructor(private todoService: TodoService, private fb: FormBuilder) {
  }

  modalCancelled() {
		this.display = 'none';
	}

  onCreateTodoSubmmitted() {
		this.display = 'none';
	}

	ngOnInit(){
		//get chat!!!
    this.todoService.createTodoOccurred
      .subscribe(
				(result: any) => {
					this.display = 'block';
					//this.chat = .....
				});

		this.createTodoForm = this.fb.group({
			name: ['', Validators.required],
			user: ['', Validators.required],
			details: [''],
			importance: [''],
			day: [''],
			month: [''],
			year: ['']
		});
	}

	updateCheckedUsers(user){
		if(this.users.includes(user)){
			for(var i=0; i<this.selectedUsernames.length; i++){
				if(this.selectedUsernames[i] == user.name){
					this.selectedUsernames.splice(i,1);
				}
			}
			for(var i=0; i<this.users.length; i++){
				if(this.users[i] == user){
					this.users.splice(i,1);
				}
			}
		}
		else{
			this.users.push(user);
			this.selectedUsernames.push(user.name);
		}
	}
}
