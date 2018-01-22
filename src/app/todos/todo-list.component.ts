import { Component, OnInit, Input } from '@angular/core';

import { ChatService } from '../chat/chat.service';

@Component ({
	selector: 'todo-list-component',
	templateUrl: './todo-list.component.html',
	styleUrls: [String('./todo-list.component.sass')]
})

export class TodoListComponent {
	@Input() groupname: string;
	todos: any[] = [];

	constructor(private chatService: ChatService){};

	todo: Todo = {
		name: 'a todo',
		description: 'a description',
		user: 'Max',
		deadline: 'now',
		group: 'group1'
	};

	ngOnInit(){
		if(this.groupname == 'group1'){
			this.todos.push(this.todo);
		}
	}
}
