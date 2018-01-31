import { Component, OnInit, Input } from '@angular/core';

import { ChatService } from '../chat/chat.service';

import { Todo } from './todo.model';

@Component ({
	selector: 'todo-list-component',
	templateUrl: './todo-list.component.html',
	styleUrls: [String('./todo-list.component.sass')]
})

export class TodoListComponent implements OnInit {
	@Input() groupname: string;
	todos: any[] = [];

	constructor(private chatService: ChatService){};

	todo: Todo = {
		name: 'a todo',
		description: 'a description',
		user: 'Max',
		deadline: 'now',
		group: 'group1',
		subTodo: false,
		parentTodo: ''
	};

	todo2: Todo = {
		name: 'another todo',
		description: 'to test groups',
		user: 'Max',
		deadline: 'later',
		group: 'group2',
		subTodo: false,
		parentTodo: ''
	}

	todo3: Todo = {
		name: 'a third todo',
		description: 'this is todo3',
		user: 'Max',
		deadline: 'now',
		group: 'group1',
		subTodo: false,
		parentTodo: ''
	};

	ngOnInit(){
		if(this.groupname == 'group1'){
			this.todos.push(this.todo);
			this.todos.push(this.todo3);
		}
		if(this.groupname == 'group2'){
			this.todos.push(this.todo2);
		}
	}
}
