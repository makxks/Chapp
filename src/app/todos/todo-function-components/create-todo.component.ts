import { Component, OnInit } from '@angular/core';

import { ReactiveFormsModule, FormBuilder, FormGroup, FormControl, Validators } from "@angular/forms";

import { TodoService } from '../todo.service';
import { ContactService } from '../../layout/contact-list/contact.service';

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
	isSubTodo: boolean = false;
  display = 'none';
	createTodoForm: FormGroup;
	users: User[] = [];
	selectedUsernames: string[] = [];

  constructor(private todoService: TodoService, private fb: FormBuilder, private contactService: ContactService) {
  }

  modalCancelled() {
		this.display = 'none';
	}

  onCreateTodoSubmitted() {
		var submittedTodo: Todo = new Todo(
			this.createTodoForm.value.name,
			this.createTodoForm.value.details,
			this.users,
			//create a Date
			new Date(this.createTodoForm.value.year, this.createTodoForm.value.month, this.createTodoForm.value.day).getTime(),
			this.chat,
			this.isSubTodo,
			this.parentTodo,
			this.chat.owner,
			this.createTodoForm.value.importance
		)
		if(!this.isSubTodo){
			this.todoService.addNewTodo(submittedTodo);
		}
		else if(this.isSubTodo){
			this.todoService.addSubTodo(submittedTodo);
		}
		this.display = 'none';
		this.createTodoForm.reset();
	}

	ngOnInit(){
    this.todoService.createTodoOccurred
      .subscribe(
				(result: any) => {
					this.display = 'block';
					this.chat = result;
					this.isSubTodo = false;
					this.users = [];
					this.selectedUsernames = [];
				});

		//createSubTodoOccurred
		this.todoService.createSubTodoOccurred
			.subscribe(
				(result: any) => {
					this.display = 'block';
					this.parentTodo = result;
					this.chat = result.chat;
					this.isSubTodo = true;
					this.users = [];
					this.selectedUsernames = [];
				}
			)

		this.createTodoForm = this.fb.group({
			name: ['', Validators.required],
			users: [[], Validators.required],
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
